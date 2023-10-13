// @generated by protoc-gen-es v1.3.3 with parameter "target=ts,import_extension="
// @generated from file redpanda/api/dataplane/v1alpha1/user.proto (package redpanda.api.dataplane.v1alpha1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum redpanda.api.dataplane.v1alpha1.SASLMechanism
 */
export enum SASLMechanism {
  /**
   * @generated from enum value: SASL_MECHANISM_UNSPECIFIED = 0;
   */
  SASL_MECHANISM_UNSPECIFIED = 0,

  /**
   * @generated from enum value: SASL_MECHANISM_SCRAM_SHA_256 = 1;
   */
  SASL_MECHANISM_SCRAM_SHA_256 = 1,

  /**
   * @generated from enum value: SASL_MECHANISM_SCRAM_SHA_512 = 2;
   */
  SASL_MECHANISM_SCRAM_SHA_512 = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(SASLMechanism)
proto3.util.setEnumType(SASLMechanism, "redpanda.api.dataplane.v1alpha1.SASLMechanism", [
  { no: 0, name: "SASL_MECHANISM_UNSPECIFIED" },
  { no: 1, name: "SASL_MECHANISM_SCRAM_SHA_256" },
  { no: 2, name: "SASL_MECHANISM_SCRAM_SHA_512" },
]);

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.ListUsersRequest
 */
export class ListUsersRequest extends Message<ListUsersRequest> {
  /**
   * @generated from field: optional string name = 1;
   */
  name?: string;

  constructor(data?: PartialMessage<ListUsersRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.ListUsersRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListUsersRequest {
    return new ListUsersRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListUsersRequest {
    return new ListUsersRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListUsersRequest {
    return new ListUsersRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListUsersRequest | PlainMessage<ListUsersRequest> | undefined, b: ListUsersRequest | PlainMessage<ListUsersRequest> | undefined): boolean {
    return proto3.util.equals(ListUsersRequest, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.ListUsersResponse
 */
export class ListUsersResponse extends Message<ListUsersResponse> {
  /**
   * @generated from field: repeated redpanda.api.dataplane.v1alpha1.ListUsersResponse.User users = 1;
   */
  users: ListUsersResponse_User[] = [];

  constructor(data?: PartialMessage<ListUsersResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.ListUsersResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "users", kind: "message", T: ListUsersResponse_User, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListUsersResponse {
    return new ListUsersResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListUsersResponse {
    return new ListUsersResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListUsersResponse {
    return new ListUsersResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListUsersResponse | PlainMessage<ListUsersResponse> | undefined, b: ListUsersResponse | PlainMessage<ListUsersResponse> | undefined): boolean {
    return proto3.util.equals(ListUsersResponse, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.ListUsersResponse.User
 */
export class ListUsersResponse_User extends Message<ListUsersResponse_User> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: optional redpanda.api.dataplane.v1alpha1.SASLMechanism mechanism = 2;
   */
  mechanism?: SASLMechanism;

  constructor(data?: PartialMessage<ListUsersResponse_User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.ListUsersResponse.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "mechanism", kind: "enum", T: proto3.getEnumType(SASLMechanism), opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListUsersResponse_User {
    return new ListUsersResponse_User().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListUsersResponse_User {
    return new ListUsersResponse_User().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListUsersResponse_User {
    return new ListUsersResponse_User().fromJsonString(jsonString, options);
  }

  static equals(a: ListUsersResponse_User | PlainMessage<ListUsersResponse_User> | undefined, b: ListUsersResponse_User | PlainMessage<ListUsersResponse_User> | undefined): boolean {
    return proto3.util.equals(ListUsersResponse_User, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.CreateUserRequest
 */
export class CreateUserRequest extends Message<CreateUserRequest> {
  /**
   * @generated from field: redpanda.api.dataplane.v1alpha1.CreateUserRequest.User user = 1;
   */
  user?: CreateUserRequest_User;

  constructor(data?: PartialMessage<CreateUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.CreateUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: CreateUserRequest_User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateUserRequest {
    return new CreateUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateUserRequest {
    return new CreateUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateUserRequest {
    return new CreateUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateUserRequest | PlainMessage<CreateUserRequest> | undefined, b: CreateUserRequest | PlainMessage<CreateUserRequest> | undefined): boolean {
    return proto3.util.equals(CreateUserRequest, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.CreateUserRequest.User
 */
export class CreateUserRequest_User extends Message<CreateUserRequest_User> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string password = 2;
   */
  password = "";

  /**
   * @generated from field: redpanda.api.dataplane.v1alpha1.SASLMechanism mechanism = 3;
   */
  mechanism = SASLMechanism.SASL_MECHANISM_UNSPECIFIED;

  constructor(data?: PartialMessage<CreateUserRequest_User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.CreateUserRequest.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "password", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "mechanism", kind: "enum", T: proto3.getEnumType(SASLMechanism) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateUserRequest_User {
    return new CreateUserRequest_User().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateUserRequest_User {
    return new CreateUserRequest_User().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateUserRequest_User {
    return new CreateUserRequest_User().fromJsonString(jsonString, options);
  }

  static equals(a: CreateUserRequest_User | PlainMessage<CreateUserRequest_User> | undefined, b: CreateUserRequest_User | PlainMessage<CreateUserRequest_User> | undefined): boolean {
    return proto3.util.equals(CreateUserRequest_User, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.CreateUserResponse
 */
export class CreateUserResponse extends Message<CreateUserResponse> {
  /**
   * @generated from field: redpanda.api.dataplane.v1alpha1.CreateUserResponse.User user = 1;
   */
  user?: CreateUserResponse_User;

  constructor(data?: PartialMessage<CreateUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.CreateUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: CreateUserResponse_User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateUserResponse {
    return new CreateUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateUserResponse {
    return new CreateUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateUserResponse {
    return new CreateUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateUserResponse | PlainMessage<CreateUserResponse> | undefined, b: CreateUserResponse | PlainMessage<CreateUserResponse> | undefined): boolean {
    return proto3.util.equals(CreateUserResponse, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.CreateUserResponse.User
 */
export class CreateUserResponse_User extends Message<CreateUserResponse_User> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: optional redpanda.api.dataplane.v1alpha1.SASLMechanism mechanism = 2;
   */
  mechanism?: SASLMechanism;

  constructor(data?: PartialMessage<CreateUserResponse_User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.CreateUserResponse.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "mechanism", kind: "enum", T: proto3.getEnumType(SASLMechanism), opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateUserResponse_User {
    return new CreateUserResponse_User().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateUserResponse_User {
    return new CreateUserResponse_User().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateUserResponse_User {
    return new CreateUserResponse_User().fromJsonString(jsonString, options);
  }

  static equals(a: CreateUserResponse_User | PlainMessage<CreateUserResponse_User> | undefined, b: CreateUserResponse_User | PlainMessage<CreateUserResponse_User> | undefined): boolean {
    return proto3.util.equals(CreateUserResponse_User, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.UpdateUserRequest
 */
export class UpdateUserRequest extends Message<UpdateUserRequest> {
  /**
   * @generated from field: redpanda.api.dataplane.v1alpha1.UpdateUserRequest.User user = 1;
   */
  user?: UpdateUserRequest_User;

  constructor(data?: PartialMessage<UpdateUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.UpdateUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: UpdateUserRequest_User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateUserRequest {
    return new UpdateUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateUserRequest {
    return new UpdateUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateUserRequest {
    return new UpdateUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateUserRequest | PlainMessage<UpdateUserRequest> | undefined, b: UpdateUserRequest | PlainMessage<UpdateUserRequest> | undefined): boolean {
    return proto3.util.equals(UpdateUserRequest, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.UpdateUserRequest.User
 */
export class UpdateUserRequest_User extends Message<UpdateUserRequest_User> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: string password = 2;
   */
  password = "";

  /**
   * @generated from field: redpanda.api.dataplane.v1alpha1.SASLMechanism mechanism = 3;
   */
  mechanism = SASLMechanism.SASL_MECHANISM_UNSPECIFIED;

  constructor(data?: PartialMessage<UpdateUserRequest_User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.UpdateUserRequest.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "password", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "mechanism", kind: "enum", T: proto3.getEnumType(SASLMechanism) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateUserRequest_User {
    return new UpdateUserRequest_User().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateUserRequest_User {
    return new UpdateUserRequest_User().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateUserRequest_User {
    return new UpdateUserRequest_User().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateUserRequest_User | PlainMessage<UpdateUserRequest_User> | undefined, b: UpdateUserRequest_User | PlainMessage<UpdateUserRequest_User> | undefined): boolean {
    return proto3.util.equals(UpdateUserRequest_User, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.UpdateUserResponse
 */
export class UpdateUserResponse extends Message<UpdateUserResponse> {
  /**
   * @generated from field: redpanda.api.dataplane.v1alpha1.UpdateUserResponse.User user = 1;
   */
  user?: UpdateUserResponse_User;

  constructor(data?: PartialMessage<UpdateUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.UpdateUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: UpdateUserResponse_User },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateUserResponse {
    return new UpdateUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateUserResponse {
    return new UpdateUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateUserResponse {
    return new UpdateUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateUserResponse | PlainMessage<UpdateUserResponse> | undefined, b: UpdateUserResponse | PlainMessage<UpdateUserResponse> | undefined): boolean {
    return proto3.util.equals(UpdateUserResponse, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.UpdateUserResponse.User
 */
export class UpdateUserResponse_User extends Message<UpdateUserResponse_User> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: optional redpanda.api.dataplane.v1alpha1.SASLMechanism mechanism = 2;
   */
  mechanism?: SASLMechanism;

  constructor(data?: PartialMessage<UpdateUserResponse_User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.UpdateUserResponse.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "mechanism", kind: "enum", T: proto3.getEnumType(SASLMechanism), opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateUserResponse_User {
    return new UpdateUserResponse_User().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateUserResponse_User {
    return new UpdateUserResponse_User().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateUserResponse_User {
    return new UpdateUserResponse_User().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateUserResponse_User | PlainMessage<UpdateUserResponse_User> | undefined, b: UpdateUserResponse_User | PlainMessage<UpdateUserResponse_User> | undefined): boolean {
    return proto3.util.equals(UpdateUserResponse_User, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.DeleteUserRequest
 */
export class DeleteUserRequest extends Message<DeleteUserRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  constructor(data?: PartialMessage<DeleteUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.DeleteUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteUserRequest {
    return new DeleteUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteUserRequest {
    return new DeleteUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteUserRequest {
    return new DeleteUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteUserRequest | PlainMessage<DeleteUserRequest> | undefined, b: DeleteUserRequest | PlainMessage<DeleteUserRequest> | undefined): boolean {
    return proto3.util.equals(DeleteUserRequest, a, b);
  }
}

/**
 * @generated from message redpanda.api.dataplane.v1alpha1.DeleteUserResponse
 */
export class DeleteUserResponse extends Message<DeleteUserResponse> {
  constructor(data?: PartialMessage<DeleteUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.dataplane.v1alpha1.DeleteUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteUserResponse {
    return new DeleteUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteUserResponse {
    return new DeleteUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteUserResponse {
    return new DeleteUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteUserResponse | PlainMessage<DeleteUserResponse> | undefined, b: DeleteUserResponse | PlainMessage<DeleteUserResponse> | undefined): boolean {
    return proto3.util.equals(DeleteUserResponse, a, b);
  }
}

