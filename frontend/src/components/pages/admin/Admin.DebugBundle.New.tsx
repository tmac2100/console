/**
 * Copyright 2022 Redpanda Data, Inc.
 *
 * Use of this software is governed by the Business Source License
 * included in the file https://github.com/redpanda-data/redpanda/blob/dev/licenses/bsl.md
 *
 * As of the Change Date specified in that file, in accordance with
 * the Business Source License, use of this software will be governed
 * by the Apache License, Version 2.0
 */

import { observer, useLocalObservable } from 'mobx-react';
import { api, rolesApi, } from '../../../state/backendApi';
import '../../../utils/arrayExtensions';
import { makeObservable, observable } from 'mobx';
import { DefaultSkeleton } from '../../../utils/tsxUtils';
import { Alert, AlertIcon, Box, Button, Checkbox, DateTimeInput, Flex, FormField, Grid, GridItem, Input, isMultiValue, isSingleValue, PasswordInput, Select, Text } from '@redpanda-data/ui';
import { PageComponent, PageInitHelper } from '../Page';
import { appGlobal } from '../../../state/appGlobal';
import { FC, useEffect, useState } from 'react';
import { CreateDebugBundleRequest, LabelSelector, SCRAMAuth, SCRAMAuth_Mechanism } from '../../../protogen/redpanda/api/console/v1alpha1/debug_bundle_pb';
import { MdDeleteOutline } from 'react-icons/md';
import { Timestamp } from '@bufbuild/protobuf';
import { AclRequestDefault, BrokerWithConfigAndStorage } from '../../../state/restInterfaces';
import { SingleSelect } from '../../misc/Select';

type ErrorDebugInfo = {
    reason?: string;
    domain?: string;
    fieldViolations?: Array<{
        field: string;
        description: string;
    }>;
};

type ErrorDetail = {
    type: string;
    value: string;
    debug?: ErrorDebugInfo;
};

// This is a tmp workaround until we figure out how to properly type response errors from the backend
type ErrorResponse = {
    code: string;
    message: string;
    details: ErrorDetail[];
};

type FieldViolationsMap = {
    [field: string]: string;
};

@observer
export default class AdminPageDebugBundleNew extends PageComponent<{}> {
    @observable advancedForm = false;
    @observable submitInProgress = false;

    @observable jobId: string | undefined = undefined;
    @observable createBundleError: ErrorResponse | undefined = undefined;

    initPage(p: PageInitHelper): void {
        p.title = 'Generate debug bundle';
        p.addBreadcrumb('Admin', '/admin');
        p.addBreadcrumb('Generate debug bundle', '/admin/debug-bundle/progress');

        this.refreshData(true);
        appGlobal.onRefresh = () => this.refreshData(true);
    }

    refreshData(force: boolean) {
        api.refreshAdminInfo(force);
        api.refreshDebugBundleStatuses();
    }

    constructor(p: any) {
        super(p);
        makeObservable(this);
    }

    render() {
        if (!api.adminInfo) return DefaultSkeleton;

        return (
            <Box>
                <Text>Collect environment data that can help debug and diagnose issues with a Redpanda cluster, a broker, or the machine it’s running on. This will bundle the collected data into a ZIP file.</Text>
                <Alert status="info" my={2}>
                    <AlertIcon/>
                    This is an advanced feature, best used if you have received direction to do so from Redpanda support.
                </Alert>



                {this.submitInProgress && <Box>
                        Generating bundle ...
                    </Box>}

                <NewDebugBundleForm
                    onSubmit={(data: CreateDebugBundleRequest) => {
                        this.submitInProgress = true;
                        this.createBundleError = undefined;
                        api.createDebugBundle(data).then(result => {
                            appGlobal.history.push(`/admin/debug-bundle/progress/${result.jobId}`);
                        }).catch((err: ErrorResponse) => {
                            this.createBundleError = err;
                        }).finally(() => {
                            this.submitInProgress = false;
                        });
                    }}
                    error={this.createBundleError}
                />
            </Box>
        );
    }
}


const NewDebugBundleForm: FC<{ onSubmit: (data: CreateDebugBundleRequest) => void, error?: ErrorResponse }> = observer(({ onSubmit, error }) => {
    const [advancedForm, setAdvancedForm] = useState(false);

    useEffect(() => {
        void api.refreshBrokers(true);
        void api.refreshPartitions('all', true);
        void api.refreshAdminInfo(true);
    }, []);

    const scramUsers = api.adminInfo?.users.filter(x => x.loginProvider === 'Plain');

    const fieldViolationsMap = error?.details?.find(({debug}) => debug?.fieldViolations)?.debug?.fieldViolations?.reduce((acc, violation) => {
            acc[violation.field] = violation.description;
            return acc;
        }, {} as FieldViolationsMap)

    const formState = useLocalObservable(() => ({
        scram: {
            username: '',
            password: '',
            mechanism: SCRAMAuth_Mechanism.SCRAM_SHA_256
        } as SCRAMAuth,
        skipTlsVerification: false,
        brokerIds: [] as number[],
        tlsEnabled: false,
        tlsInsecureSkipVerify: false,
        controllerLogsSizeLimitBytes: 0 as number,
        cpuProfilerWaitSeconds: undefined as number | undefined,
        logsSince: undefined as number | undefined,
        logsSizeLimitBytes: 0 as number,
        logsSizeLimitUnit: 1,
        logsUntil: undefined as number | undefined,
        metricsIntervalSeconds: 0 as number,
        metricsSamples: '' as string,
        namespace: '' as string,
        partitions: [] as string[],
        labelSelectors: [] as Array<{key: string, value: string}>,

        // Setters
        setUsername(username: string) {
            this.scram.username = username;
        },
        setPassword(password: string) {
            this.scram.password = password;
        },
        setBrokerIds(ids: number[]) {
            this.brokerIds = ids;
        },
        setControllerLogsSizeLimitBytes(size: number) {
            this.controllerLogsSizeLimitBytes = size;
        },
        setCpuProfilerWaitSeconds(seconds: number) {
            this.cpuProfilerWaitSeconds = seconds;
        },
        setLogsSince(date: number) {
            this.logsSince = date;
        },
        setLogsSizeLimitBytes(size: number) {
            this.logsSizeLimitBytes = size;
        },
        setLogsSizeLimitUnit(unit: number) {
            this.logsSizeLimitUnit = unit;
        },
        setLogsUntil(date: number) {
            this.logsUntil = date;
        },
        setMetricsIntervalSeconds(seconds: number) {
            this.metricsIntervalSeconds = seconds;
        },
        setMetricsSamples(samples: string) {
            this.metricsSamples = samples;
        },
        setNamespace(namespace: string) {
            this.namespace = namespace;
        },
        setPartitions(partitions: string[]) {
            this.partitions = partitions;
        },
        addLabelSelector() {
            this.labelSelectors.push({
                key: '',
                value: '',
            });
        },
        removeLabelSelector(idx: number) {
            this.labelSelectors.splice(idx, 1);
        },
        setLabelSelectorKey(value: string, idx: number) {
            this.labelSelectors[idx].key = value;
        },
        setLabelSelectorValue(value: string, idx: number) {
            this.labelSelectors[idx].value = value;
        },
    }));

    return (
        <Box mt={4}>
            {advancedForm && <Flex
                flexDirection="column"
                width={{
                    base: 'full',
                    sm: 500,
                }}
                gap={2}
            >
                <FormField label="SCRAM user" errorText={fieldViolationsMap?.['scram.username']} isInvalid={!!fieldViolationsMap?.['scram.username']}>
                    <Input
                        data-testid="scram-user-input"
                        value={formState.scram.username}
                        onChange={(e) => formState.setUsername(e.target.value)}
                    />
                    {/*<SingleSelect<string>*/}
                    {/*    data-testid="scram-user-input"*/}
                    {/*    options={scramUsers?.map(x => ({*/}
                    {/*        value: x.internalIdentifier,*/}
                    {/*        label: x.internalIdentifier,*/}
                    {/*    })) ?? []}*/}
                    {/*    value={formState.scram.username}*/}
                    {/*    onChange={(e) => {*/}
                    {/*        formState.setUsername(e)*/}
                    {/*    }}*/}
                    {/*/>*/}
                </FormField>
                <FormField label="SASL Mechanism" showRequiredIndicator>
                    <SingleSelect<SCRAMAuth_Mechanism>
                        options={[
                            {
                                value: SCRAMAuth_Mechanism.SCRAM_SHA_256,
                                label: 'SCRAM-SHA-256',
                            },
                            {
                                value: SCRAMAuth_Mechanism.SCRAM_SHA_512,
                                label: 'SCRAM-SHA-512',
                            },
                        ]}
                        value={formState.scram.mechanism}
                        onChange={(e) => {
                            formState.scram.mechanism = e;
                        }}
                    />
                </FormField>
                <Checkbox
                    isChecked={formState.tlsEnabled}
                    onChange={x => formState.tlsEnabled = x.target.checked}
                >
                    TLS enabled
                </Checkbox>
                <Checkbox
                    isChecked={formState.skipTlsVerification}
                    onChange={x => formState.skipTlsVerification = x.target.checked}
                >
                    Skip TLS verification
                </Checkbox>
                <FormField label="Password" errorText={fieldViolationsMap?.['scram.password']} isInvalid={!!fieldViolationsMap?.['scram.password']}>
                    <PasswordInput
                        data-testid="scram-user-password"
                        value={formState.scram.password}
                        onChange={(e) => formState.setPassword(e.target.value)}
                    />
                </FormField>
                <FormField label="Broker(s)" description="Specify broker IDs (or leave blank for all)">
                    <Select<BrokerWithConfigAndStorage['brokerId']>
                        isMulti
                        options={api.brokers?.map(x => ({
                            value: x.brokerId,
                            label: `${x.brokerId}`,
                        })) ?? []}
                        onChange={x => {
                            if (isMultiValue(x)) {
                                formState.setBrokerIds(x.map(x => x.value))
                            }
                        }}
                    />
                </FormField>
                <FormField
                    label="Controller log size limit"
                    description={'The size limit of the controller logs that can be stored in the bundle (e.g. 3MB, 1GiB) (default "132MB")'}
                    errorText={fieldViolationsMap?.['controllerLogsSizeLimitBytes']}
                    isInvalid={!!fieldViolationsMap?.['controllerLogsSizeLimitBytes']}
                >
                    <Input
                        type="number"
                        data-testid="controller-log-size-input"
                        value={formState.controllerLogsSizeLimitBytes}
                        onChange={(e) => formState.setControllerLogsSizeLimitBytes(e.target.valueAsNumber)}
                    />
                </FormField>
                <FormField
                    label="CPU profiler wait"
                    description="How long in seconds to collect samples for the CPU profiler. Must be higher than 15s (default 30s)"
                    errorText={fieldViolationsMap?.['cpuProfilerWaitSeconds']}
                    isInvalid={!!fieldViolationsMap?.['cpuProfilerWaitSeconds']}
                >
                    <Input
                        data-testid="cpu-profiler-input"
                        value={formState.cpuProfilerWaitSeconds}
                        type="number"
                        onChange={(e) => formState.setCpuProfilerWaitSeconds(e.target.valueAsNumber)}
                    />
                </FormField>
                <FormField
                    label="Logs since"
                    description="Include logs dated from specified date onward; (journalctl date format: YYYY-MM-DD, 'yesterday', or 'today'). Default 'yesterday'."
                    errorText={fieldViolationsMap?.['logsSince']}
                    isInvalid={!!fieldViolationsMap?.['logsSince']}
                >
                    <DateTimeInput
                        value={formState.logsSince}
                        onChange={formState.setLogsSince}
                    />
                </FormField>
                <FormField
                    label="Logs until"
                    description="Include logs older than the specified date; (journalctl date format: YYYY-MM-DD, 'yesterday', or 'today')."
                    errorText={fieldViolationsMap?.['logsUntil']}
                    isInvalid={!!fieldViolationsMap?.['logsUntil']}
                >
                    <DateTimeInput
                        value={formState.logsUntil}
                        onChange={formState.setLogsUntil}
                    />
                </FormField>
                <FormField
                    label="Logs size limit"
                    description="Read the logs until the given size is reached (e.g. 3MB, 1GB). Default 100MB."
                    errorText={fieldViolationsMap?.['logsSizeLimitBytes']}
                    isInvalid={!!fieldViolationsMap?.['logsSizeLimitBytes']}
                >
                    <Flex gap={2}>
                        <Input
                            type="number"
                            data-testid="log-size-limit-input"
                            value={formState.logsSizeLimitBytes}
                            onChange={(e) => formState.setLogsSizeLimitBytes(e.target.valueAsNumber)}
                        />
                        <Select
                            chakraStyles={{
                                container: (provided) => ({
                                    ...provided,
                                    minWidth: 150
                                }),
                            }}
                            options={[
                                {
                                    value: 1,
                                    label: 'Bytes'
                                },
                                {
                                    value: 1024,
                                    label: 'KB'
                                },
                                {
                                    value: 1024 * 1024,
                                    label: 'MB'
                                },
                                {
                                    value: 1024 * 1024 * 1024,
                                    label: 'GB'
                                }
                            ]}
                            onChange={(value) => {
                                if(value && isSingleValue(value)) {
                                    formState.setLogsSizeLimitUnit(value.value);
                                }
                            }}
                        />
                    </Flex>
                </FormField>
                <FormField
                    label="Metrics interval duration"
                    description="Interval between metrics snapshots (e.g. 30s, 1.5m) (default 10s)"
                    errorText={fieldViolationsMap?.['metricsIntervalSeconds']}
                    isInvalid={!!fieldViolationsMap?.['metricsIntervalSeconds']}
                >
                    <Input
                        type="number"
                        data-testid="metrics-interval-duration-input"
                        value={formState.metricsIntervalSeconds}
                        onChange={(e) => formState.setMetricsIntervalSeconds(e.target.valueAsNumber)}
                    />
                </FormField>
                <FormField
                    label="Metrics samples"
                    description="Number of metrics samples to take (at the interval of 'metrics interval duration'). Must be >= 2"
                    errorText={fieldViolationsMap?.['metricsSamples']}
                    isInvalid={!!fieldViolationsMap?.['metricsSamples']}
                >
                    <Input
                        data-testid="metrics-samples-in put"
                        value={formState.metricsSamples}
                        onChange={(e) => formState.setMetricsSamples(e.target.value)}
                    />
                </FormField>
                <FormField
                    label="Namespace"
                    description='The namespace to use to collect the resources from (k8s only). Default "redpanda".'
                    errorText={fieldViolationsMap?.['namespace']}
                    isInvalid={!!fieldViolationsMap?.['namespace']}
                >
                    <Input
                        data-testid="namespace-input"
                        value={formState.namespace}
                        onChange={(e) => formState.setNamespace(e.target.value)}
                    />
                </FormField>
                <FormField
                    label="Partition(s)"
                    description="Partition IDs."
                    errorText={fieldViolationsMap?.['partitions']}
                    isInvalid={!!fieldViolationsMap?.['partitions']}
                >
                    <Select<string>
                        isMulti
                        options={api.getTopicPartitionArray.map(x => ({
                            value: x,
                            label: x
                        }))}
                        onChange={x => {
                            if (isMultiValue(x)) {
                                formState.setPartitions(x.map(x => x.value))
                            }
                        }}
                    />
                </FormField>
                <FormField
                    label="Label selectors"
                    description="Label selectors to filter your resources."
                    errorText={fieldViolationsMap?.['labelSelectors']}
                    isInvalid={!!fieldViolationsMap?.['labelSelectors']}
                >
                    {formState.labelSelectors.map((labelSelector, idx) =>
                        <Grid gap={2} key={idx} templateColumns="1fr 1fr auto">
                            <GridItem>
                                <Text fontSize="sm">Key</Text>
                                <Input
                                    value={labelSelector.key}
                                    onChange={(e) => {
                                        formState.setLabelSelectorKey(e.target.value, idx);
                                    }}
                                />
                            </GridItem>
                            <GridItem>
                                <Text fontSize="sm">Value</Text>
                                <Input
                                    value={labelSelector.value}
                                    onChange={(e) => {
                                        formState.setLabelSelectorValue(e.target.value, idx);
                                    }}
                                />
                            </GridItem>
                            <GridItem display="flex" alignItems="flex-end">
                                <Button variant="ghost" onClick={() => {
                                    formState.removeLabelSelector(idx);
                                }}>
                                    <MdDeleteOutline/>
                                </Button>
                            </GridItem>
                        </Grid>
                    )}
                    <Box>
                        <Button variant="outline" my={2} onClick={() => {
                            formState.addLabelSelector();
                        }}>Add</Button>
                    </Box>
                </FormField>
            </Flex>}

            {error && <Alert status="error" my={4}>
                <AlertIcon/>
                {error.message}
            </Alert>}

            <Flex gap={2} mt={4}>
                {advancedForm ?
                    <>
                        <Button onClick={() => {
                            onSubmit(new CreateDebugBundleRequest({
                                authentication: {
                                    case: 'scram',
                                    value: formState.scram
                                },
                                brokerIds: formState.brokerIds,
                                controllerLogsSizeLimitBytes: formState.controllerLogsSizeLimitBytes,
                                cpuProfilerWaitSeconds: formState.cpuProfilerWaitSeconds,
                                logsSince: formState.logsSince ? Timestamp.fromDate(new Date(formState.logsSince)): undefined,
                                logsSizeLimitBytes: formState.logsSizeLimitBytes * formState.logsSizeLimitUnit,
                                logsUntil: formState.logsUntil ? Timestamp.fromDate(new Date(formState.logsUntil)) : undefined,
                                metricsIntervalSeconds: formState.metricsIntervalSeconds,
                                tlsEnabled: formState.tlsEnabled,
                                tlsInsecureSkipVerify: formState.tlsInsecureSkipVerify,
                                namespace: formState.namespace,
                                labelSelector: formState.labelSelectors.map(x => new LabelSelector(x)),
                                partitions: formState.partitions,
                            }));
                        }}>Generate</Button>
                        <Flex alignItems="center" gap={1}>
                            or
                            <Button px={0} variant="link" onClick={() => {
                                setAdvancedForm(false);
                            }}>back to default</Button>
                        </Flex>
                    </>
                    :
                    <>
                        <Button onClick={async () => {
                            onSubmit(new CreateDebugBundleRequest());
                        }}>Generate default</Button>
                        <Button variant="link" onClick={() => {
                            setAdvancedForm(true);
                        }}>
                            or customize
                        </Button>
                    </>}
            </Flex>
        </Box>
    );
});
