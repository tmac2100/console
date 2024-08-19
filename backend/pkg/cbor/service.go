// Copyright 2022 Redpanda Data, Inc.
//
// Use of this software is governed by the Business Source License
// included in the file https://github.com/redpanda-data/redpanda/blob/dev/licenses/bsl.md
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0

// Package cbor provides the deserialization logic for CBOR encoded
// payloads.
package cbor

import (
	"regexp"

	"github.com/redpanda-data/console/backend/pkg/config"
)

// Service represents messagepack cfg, topic name regexes.
type Service struct {
	cfg config.Cbor

	AllowedTopicsExpr []*regexp.Regexp
}

// NewService returns a new instance of Service with compiled regexes.
func NewService(cfg config.Cbor) (*Service, error) {
	allowedTopicsExpr, err := config.CompileRegexes(cfg.TopicNames)
	if err != nil {
		return nil, err
	}

	return &Service{
		cfg:               cfg,
		AllowedTopicsExpr: allowedTopicsExpr,
	}, nil
}

// IsTopicAllowed validates if a topicName is permitted as per the config regexes.
func (s *Service) IsTopicAllowed(topicName string) bool {
	if !s.cfg.Enabled {
		return false
	}

	isAllowed := false
	for _, regex := range s.AllowedTopicsExpr {
		if regex.MatchString(topicName) {
			isAllowed = true
			break
		}
	}

	return isAllowed
}
