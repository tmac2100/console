// Copyright 2022 Redpanda Data, Inc.
//
// Use of this software is governed by the Business Source License
// included in the file https://github.com/redpanda-data/redpanda/blob/dev/licenses/bsl.md
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0

//go:build integration

package console

import (
	"context"

	"github.com/redpanda-data/console/backend/pkg/config"
	"github.com/redpanda-data/console/backend/pkg/kafka"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap"
)

func (s *ConsoleIntegrationTestSuite) TestGetTopicConfigs() {
	t := s.T()
	assert := assert.New(t)
	require := require.New(t)

	ctx := context.Background()
	logCfg := zap.NewDevelopmentConfig()
	logCfg.Level = zap.NewAtomicLevelAt(zap.InfoLevel)
	log, err := logCfg.Build()
	assert.NoError(err)

	testSeedBroker := s.testSeedBroker
	topicName := topicNameForTest("get_topic_configs")

	// setup
	_, err = s.kafkaAdminClient.CreateTopic(ctx, 1, 1, nil, topicName)
	require.NoError(err)

	cfg := config.Config{}
	cfg.SetDefaults()
	cfg.MetricsNamespace = metricNameForTest("get_topic_configs")
	cfg.Kafka.Brokers = []string{testSeedBroker}

	kafkaSvc, err := kafka.NewService(&cfg, log, cfg.MetricsNamespace)
	assert.NoError(err)

	svc, err := NewService(cfg.Console, log, kafkaSvc, nil, nil)
	assert.NoError(err)

	defer svc.kafkaSvc.KafkaClient.Close()

	topicConfig, restErr := svc.GetTopicConfigs(ctx, topicName, nil)
	assert.Nil(restErr)
	assert.NotNil(topicConfig)
	assert.Equal(topicName, topicConfig.TopicName)
	assert.NotEmpty(topicConfig.ConfigEntries)

	assert.NotNil(topicConfig.ConfigEntries[0])
	assert.False(topicConfig.ConfigEntries[0].IsReadOnly)
}
