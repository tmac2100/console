// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             (unknown)
// source: redpanda/api/console/v1alpha1/license.proto

package consolev1alpha1

import (
	context "context"

	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	LicenseService_ListLicenses_FullMethodName = "/redpanda.api.console.v1alpha1.LicenseService/ListLicenses"
	LicenseService_SetLicense_FullMethodName   = "/redpanda.api.console.v1alpha1.LicenseService/SetLicense"
)

// LicenseServiceClient is the client API for LicenseService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type LicenseServiceClient interface {
	// ListLicenses lists all the roles based on optional filter.
	ListLicenses(ctx context.Context, in *ListLicensesRequest, opts ...grpc.CallOption) (*ListLicensesResponse, error)
	// SetLicense installs a new license on the Redpanda cluster.
	SetLicense(ctx context.Context, in *SetLicenseRequest, opts ...grpc.CallOption) (*SetLicenseResponse, error)
}

type licenseServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewLicenseServiceClient(cc grpc.ClientConnInterface) LicenseServiceClient {
	return &licenseServiceClient{cc}
}

func (c *licenseServiceClient) ListLicenses(ctx context.Context, in *ListLicensesRequest, opts ...grpc.CallOption) (*ListLicensesResponse, error) {
	out := new(ListLicensesResponse)
	err := c.cc.Invoke(ctx, LicenseService_ListLicenses_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *licenseServiceClient) SetLicense(ctx context.Context, in *SetLicenseRequest, opts ...grpc.CallOption) (*SetLicenseResponse, error) {
	out := new(SetLicenseResponse)
	err := c.cc.Invoke(ctx, LicenseService_SetLicense_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// LicenseServiceServer is the server API for LicenseService service.
// All implementations must embed UnimplementedLicenseServiceServer
// for forward compatibility
type LicenseServiceServer interface {
	// ListLicenses lists all the roles based on optional filter.
	ListLicenses(context.Context, *ListLicensesRequest) (*ListLicensesResponse, error)
	// SetLicense installs a new license on the Redpanda cluster.
	SetLicense(context.Context, *SetLicenseRequest) (*SetLicenseResponse, error)
	mustEmbedUnimplementedLicenseServiceServer()
}

// UnimplementedLicenseServiceServer must be embedded to have forward compatible implementations.
type UnimplementedLicenseServiceServer struct {
}

func (UnimplementedLicenseServiceServer) ListLicenses(context.Context, *ListLicensesRequest) (*ListLicensesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListLicenses not implemented")
}
func (UnimplementedLicenseServiceServer) SetLicense(context.Context, *SetLicenseRequest) (*SetLicenseResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SetLicense not implemented")
}
func (UnimplementedLicenseServiceServer) mustEmbedUnimplementedLicenseServiceServer() {}

// UnsafeLicenseServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to LicenseServiceServer will
// result in compilation errors.
type UnsafeLicenseServiceServer interface {
	mustEmbedUnimplementedLicenseServiceServer()
}

func RegisterLicenseServiceServer(s grpc.ServiceRegistrar, srv LicenseServiceServer) {
	s.RegisterService(&LicenseService_ServiceDesc, srv)
}

func _LicenseService_ListLicenses_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListLicensesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(LicenseServiceServer).ListLicenses(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: LicenseService_ListLicenses_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(LicenseServiceServer).ListLicenses(ctx, req.(*ListLicensesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _LicenseService_SetLicense_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SetLicenseRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(LicenseServiceServer).SetLicense(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: LicenseService_SetLicense_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(LicenseServiceServer).SetLicense(ctx, req.(*SetLicenseRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// LicenseService_ServiceDesc is the grpc.ServiceDesc for LicenseService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var LicenseService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "redpanda.api.console.v1alpha1.LicenseService",
	HandlerType: (*LicenseServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "ListLicenses",
			Handler:    _LicenseService_ListLicenses_Handler,
		},
		{
			MethodName: "SetLicense",
			Handler:    _LicenseService_SetLicense_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "redpanda/api/console/v1alpha1/license.proto",
}
