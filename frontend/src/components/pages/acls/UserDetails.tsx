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

import { observer } from 'mobx-react';
import { PageComponent, PageInitHelper } from '../Page';
import { api, rolesApi } from '../../../state/backendApi';
import { AclRequestDefault } from '../../../state/restInterfaces';
import { makeObservable, observable } from 'mobx';
import { appGlobal } from '../../../state/appGlobal';
import { DefaultSkeleton } from '../../../utils/tsxUtils';
import PageContent from '../../misc/PageContent';
import { Box, Button, DataTable, Flex, Heading, Text } from '@redpanda-data/ui';

import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { AclPrincipalGroup, principalGroupsView } from './Models';
import { DeleteUserConfirmModal } from './DeleteUserConfirmModal';
import { UserPermissionAssignments } from './UserPermissionAssignments';

@observer
class UserDetailsPage extends PageComponent<{ userName: string; }> {

    @observable username: string = '';
    @observable mechanism: 'SCRAM-SHA-256' | 'SCRAM-SHA-512' = 'SCRAM-SHA-256';

    @observable isValidUsername: boolean = false;
    @observable isValidPassword: boolean = false;

    @observable generateWithSpecialChars: boolean = false;
    @observable step: 'CREATE_USER' | 'CREATE_USER_CONFIRMATION' = 'CREATE_USER';
    @observable isCreating: boolean = false;

    @observable selectedRoles: string[] = [];

    constructor(p: any) {
        super(p);
        makeObservable(this);
    }

    initPage(p: PageInitHelper): void {
        p.title = 'Create user';
        p.addBreadcrumb('Access control', '/security');
        p.addBreadcrumb('Users', '/security/users');
        p.addBreadcrumb(this.props.userName, '/security/users/');

        this.refreshData(true);
        appGlobal.onRefresh = () => this.refreshData(true);
    }

    async refreshData(force: boolean) {
        if (api.userData != null && !api.userData.canListAcls) return;

        await Promise.allSettled([
            api.refreshAcls(AclRequestDefault, force),
            api.refreshServiceAccounts(true),
            rolesApi.refreshRoles()
        ]);

        await rolesApi.refreshRoleMembers();
    }

    render() {
        if (!api.serviceAccounts || !api.serviceAccounts.users) return DefaultSkeleton;
        const userName = this.props.userName;

        const isServiceAccount = api.serviceAccounts.users.includes(userName);

        return <>
            <PageContent>
                <Flex gap="4">
                    <Button variant="outline" onClick={() => appGlobal.history.push(`/security/users/${userName}/edit`)}>
                        Edit
                    </Button>
                    {/* todo: refactor delete user dialog into a "fire and forget" dialog and use it in the overview list (and here) */}
                    {isServiceAccount &&
                        <DeleteUserConfirmModal
                            onConfirm={async () => {
                                await api.deleteServiceAccount(userName);
                                await api.refreshServiceAccounts(true);
                            }}
                            buttonEl={
                                <Button variant="outline-delete">
                                    Delete
                                </Button>
                            }
                            userName={userName}
                        />
                    }
                </Flex>

                <Heading as="h3" mt="4">Permissions</Heading>
                <Box>Below are all of the permissions assigned to this SCRAM user.</Box>

                <Heading as="h3" mt="4">Assignments</Heading>
                <UserPermissionAssignments userName={userName} />

                <PermissionAssignemntsDetails userName={userName} />

            </PageContent>
        </>
    }


}

export default UserDetailsPage;


const PermissionAssignemntsDetails = observer((p: {
    userName: string;
}) => {
    // Get all roles and ACLs matching this user
    // For each "AclPrincipalGroup" show its name, then a table that shows the details
    const roles: string[] = [];
    for (const [roleName, members] of rolesApi.roleMembers) {
        if (!members.any(m => m.name == p.userName))
            continue; // this role doesn't contain our user
        roles.push(roleName);
    }

    // Get all AclPrincipal groups, find the ones that apply
    const groups = principalGroupsView.principalGroups.filter(g => {
        if (g.principalType == 'User' && (g.principalName == p.userName || g.principalName === '*')) return true;
        if (g.principalType == 'RedpandaRole' && roles.includes(g.principalName)) return true;
        return false;
    });

    console.log('groups: ' + groups.map(g => g.principalName + ' (' + g.principalType + ')').join(', '));

    return <>
        {groups.map(r =>
            <>
                {
                    r.principalType == 'RedpandaRole'
                        ? <ChakraLink as={ReactRouterLink} to={`/security/roles/${r.principalName}/details`}><Heading as="h3" mt="4">{r.principalName}</Heading></ChakraLink>
                        : <Heading as="h3" mt="4">User: {r.principalName}</Heading>
                }
                <AclPrincipalGroupPermissionsTable group={r} />
            </>
        )}
    </>
});

export const AclPrincipalGroupPermissionsTable = observer((p: { group: AclPrincipalGroup }) => {

    const entries: {
        type: string;
        selector: string;
        operations: {
            allow: string[];
            deny: string[];
        };
    }[] = [];

    // Convert all entries of the group into a table row
    const group = p.group;
    for (const topicAcl of group.topicAcls) {
        const allow: string[] = [];
        const deny: string[] = [];

        if (topicAcl.all == 'Allow')
            allow.push('All');
        else if (topicAcl.all == 'Deny')
            deny.push('All');
        else {
            for (const [permName, value] of Object.entries(topicAcl.permissions)) {
                if (value == 'Allow')
                    allow.push(permName);
                if (value == 'Deny')
                    deny.push(permName);
            }
        }

        if (allow.length == 0 && deny.length == 0)
            continue;

        entries.push({
            type: 'Topic',
            selector: topicAcl.selector,
            operations: { allow, deny }
        })
    }

    for (const groupAcl of group.consumerGroupAcls) {
        const allow: string[] = [];
        const deny: string[] = [];

        if (groupAcl.all == 'Allow')
            allow.push('All');
        else if (groupAcl.all == 'Deny')
            deny.push('All');
        else {
            for (const [permName, value] of Object.entries(groupAcl.permissions)) {
                if (value == 'Allow')
                    allow.push(permName);
                if (value == 'Deny')
                    deny.push(permName);
            }
        }

        if (allow.length == 0 && deny.length == 0)
            continue;

        entries.push({
            type: 'ConsumerGroup',
            selector: groupAcl.selector,
            operations: { allow, deny }
        })
    }

    for (const transactId of group.transactionalIdAcls) {
        const allow: string[] = [];
        const deny: string[] = [];

        if (transactId.all == 'Allow')
            allow.push('All');
        else if (transactId.all == 'Deny')
            deny.push('All');
        else {
            for (const [permName, value] of Object.entries(transactId.permissions)) {
                if (value == 'Allow')
                    allow.push(permName);
                if (value == 'Deny')
                    deny.push(permName);
            }
        }

        if (allow.length == 0 && deny.length == 0)
            continue;

        entries.push({
            type: 'TransactionalID',
            selector: transactId.selector,
            operations: { allow, deny }
        })
    }

    // Cluster
    {
        const clusterAcls = group.clusterAcls;

        const allow: string[] = [];
        const deny: string[] = [];

        if (clusterAcls.all == 'Allow')
            allow.push('All');
        else if (clusterAcls.all == 'Deny')
            deny.push('All');
        else {
            for (const [permName, value] of Object.entries(clusterAcls.permissions)) {
                if (value == 'Allow')
                    allow.push(permName);
                if (value == 'Deny')
                    deny.push(permName);
            }
        }

        // Cluster only appears once, so it won't be filtered automatically,
        // we need to manually skip this entry if there isn't any content
        if (allow.length + deny.length > 0)
            entries.push({
                type: 'Cluster',
                selector: '',
                operations: { allow, deny }
            })
    }

    if (entries.length == 0)
        return <>No permissions assigned</>;

    return <>
        <DataTable
            data={entries}
            columns={[
                {
                    header: 'Type',
                    accessorKey: 'type',
                    size: 150,
                },
                {
                    header: 'Selector',
                    accessorKey: 'selector',
                    size: 300,
                },
                {
                    header: 'Operations',
                    size: Number.POSITIVE_INFINITY,
                    cell: ({ row: { original: record } }) => {

                        const allow = record.operations.allow;
                        const deny = record.operations.deny;

                        return <Box>
                            <Box whiteSpace="pre">
                                {allow.length > 0
                                    ? <>
                                        <Text as="span" fontWeight="semibold">Allow: </Text>
                                        <Text as="span" >{allow.join(', ')}</Text>
                                    </>
                                    : <Text>{' '}</Text>
                                }
                            </Box>
                            <Box>
                                {deny.length > 0
                                    ? <>
                                        <Text as="span" fontWeight="semibold">Deny: </Text>
                                        <Text as="span" >{deny.join(', ')}</Text>
                                    </>
                                    : <Text>{' '}</Text>
                                }
                            </Box>
                        </Box>
                    },
                }
            ]}
        />

    </>
})
