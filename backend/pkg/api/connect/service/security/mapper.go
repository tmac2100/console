// Copyright 2024 Redpanda Data, Inc.
//
// Use of this software is governed by the Business Source License
// included in the file licenses/BSL.md
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0

package security

import (
	"strings"

	v1alpha1 "github.com/redpanda-data/console/backend/pkg/protogen/redpanda/api/console/v1alpha1"
	"github.com/redpanda-data/console/backend/pkg/redpanda"
)

const (
	rolePrefix = "RedpandaRole:"
	userPrefix = "User:"
)

// parsePrincipal returns the prefix, and principal. If no prefix is present,
// returns User:
func parsePrincipal(p string) (principalType string, name string) {
	if strings.HasPrefix(p, userPrefix) {
		return "User", strings.TrimPrefix(p, userPrefix)
	}
	if strings.HasPrefix(p, rolePrefix) {
		return "RedpandaRole", strings.TrimPrefix(p, rolePrefix)
	}
	return "User", p
}

func adminAPIRolesToProto(roles []redpanda.Role) []*v1alpha1.Role {
	out := make([]*v1alpha1.Role, 0, len(roles))

	for _, r := range roles {
		r := r
		out = append(out, &v1alpha1.Role{Name: r.Name})
	}

	return out
}

func adminAPIRoleMembersToProto(members []redpanda.RoleMember) []*v1alpha1.RoleMembership {
	out := make([]*v1alpha1.RoleMembership, 0, len(members))

	for _, r := range members {
		r := r
		out = append(out, &v1alpha1.RoleMembership{Principal: r.PrincipalType + ":" + r.Name})
	}

	return out
}

func protoRoleMemberToAdminAPIRoleMember(members []*v1alpha1.RoleMembership) []redpanda.RoleMember {
	out := make([]redpanda.RoleMember, 0, len(members))

	for _, r := range members {
		r := r
		principalType, principal := parsePrincipal(r.GetPrincipal())
		out = append(out, redpanda.RoleMember{Name: principal, PrincipalType: principalType})
	}

	return out
}
