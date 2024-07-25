// @generated by protoc-gen-es v1.6.0 with parameter "target=ts,import_extension="
// @generated from file redpanda/api/console/v1alpha1/rp_connect.proto (package redpanda.api.console.v1alpha1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { Pipeline } from "../../dataplane/v1alpha2/pipeline_pb";

/**
 * @generated from enum redpanda.api.console.v1alpha1.PatchOperation
 */
export enum PatchOperation {
  /**
   * @generated from enum value: PATCH_OPERATION_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: PATCH_OPERATION_ADD = 1;
   */
  ADD = 1,

  /**
   * @generated from enum value: PATCH_OPERATION_ADD_FROM = 2;
   */
  ADD_FROM = 2,

  /**
   * @generated from enum value: PATCH_OPERATION_DELETE = 3;
   */
  DELETE = 3,

  /**
   * @generated from enum value: PATCH_OPERATION_SET = 4;
   */
  SET = 4,

  /**
   * @generated from enum value: PATCH_OPERATION_REPLACE = 5;
   */
  REPLACE = 5,

  /**
   * @generated from enum value: PATCH_OPERATION_COPY = 6;
   */
  COPY = 6,

  /**
   * @generated from enum value: PATCH_OPERATION_MOVE_ABOVE = 7;
   */
  MOVE_ABOVE = 7,

  /**
   * @generated from enum value: PATCH_OPERATION_MOVE_BELOW = 8;
   */
  MOVE_BELOW = 8,
}
// Retrieve enum metadata with: proto3.getEnumType(PatchOperation)
proto3.util.setEnumType(PatchOperation, "redpanda.api.console.v1alpha1.PatchOperation", [
  { no: 0, name: "PATCH_OPERATION_UNSPECIFIED" },
  { no: 1, name: "PATCH_OPERATION_ADD" },
  { no: 2, name: "PATCH_OPERATION_ADD_FROM" },
  { no: 3, name: "PATCH_OPERATION_DELETE" },
  { no: 4, name: "PATCH_OPERATION_SET" },
  { no: 5, name: "PATCH_OPERATION_REPLACE" },
  { no: 6, name: "PATCH_OPERATION_COPY" },
  { no: 7, name: "PATCH_OPERATION_MOVE_ABOVE" },
  { no: 8, name: "PATCH_OPERATION_MOVE_BELOW" },
]);

/**
 * GetConnectPipelineRequest is the request to retrieve a pipeline by name.
 *
 * @generated from message redpanda.api.console.v1alpha1.LintConfigRequest
 */
export class LintConfigRequest extends Message<LintConfigRequest> {
  /**
   * @generated from field: string yaml_config = 1;
   */
  yamlConfig = "";

  constructor(data?: PartialMessage<LintConfigRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.console.v1alpha1.LintConfigRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "yaml_config", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LintConfigRequest {
    return new LintConfigRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LintConfigRequest {
    return new LintConfigRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LintConfigRequest {
    return new LintConfigRequest().fromJsonString(jsonString, options);
  }

  static equals(a: LintConfigRequest | PlainMessage<LintConfigRequest> | undefined, b: LintConfigRequest | PlainMessage<LintConfigRequest> | undefined): boolean {
    return proto3.util.equals(LintConfigRequest, a, b);
  }
}

/**
 * @generated from message redpanda.api.console.v1alpha1.LintConfigResponse
 */
export class LintConfigResponse extends Message<LintConfigResponse> {
  /**
   * @generated from field: bool valid = 1;
   */
  valid = false;

  /**
   * @generated from field: repeated redpanda.api.console.v1alpha1.LintConfigResponse.Lint lints = 2;
   */
  lints: LintConfigResponse_Lint[] = [];

  constructor(data?: PartialMessage<LintConfigResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.console.v1alpha1.LintConfigResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "valid", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "lints", kind: "message", T: LintConfigResponse_Lint, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LintConfigResponse {
    return new LintConfigResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LintConfigResponse {
    return new LintConfigResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LintConfigResponse {
    return new LintConfigResponse().fromJsonString(jsonString, options);
  }

  static equals(a: LintConfigResponse | PlainMessage<LintConfigResponse> | undefined, b: LintConfigResponse | PlainMessage<LintConfigResponse> | undefined): boolean {
    return proto3.util.equals(LintConfigResponse, a, b);
  }
}

/**
 * @generated from message redpanda.api.console.v1alpha1.LintConfigResponse.Lint
 */
export class LintConfigResponse_Lint extends Message<LintConfigResponse_Lint> {
  /**
   * @generated from field: int32 line = 1;
   */
  line = 0;

  /**
   * @generated from field: int32 column = 2;
   */
  column = 0;

  /**
   * @generated from field: string reason = 3;
   */
  reason = "";

  constructor(data?: PartialMessage<LintConfigResponse_Lint>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.console.v1alpha1.LintConfigResponse.Lint";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "line", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "column", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "reason", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LintConfigResponse_Lint {
    return new LintConfigResponse_Lint().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LintConfigResponse_Lint {
    return new LintConfigResponse_Lint().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LintConfigResponse_Lint {
    return new LintConfigResponse_Lint().fromJsonString(jsonString, options);
  }

  static equals(a: LintConfigResponse_Lint | PlainMessage<LintConfigResponse_Lint> | undefined, b: LintConfigResponse_Lint | PlainMessage<LintConfigResponse_Lint> | undefined): boolean {
    return proto3.util.equals(LintConfigResponse_Lint, a, b);
  }
}

/**
 * TreeNodeGroup represents a group of tree nodes.
 *
 * @generated from message redpanda.api.console.v1alpha1.TreeNodeGroup
 */
export class TreeNodeGroup extends Message<TreeNodeGroup> {
  /**
   * @generated from field: repeated redpanda.api.console.v1alpha1.TreeNode children = 1;
   */
  children: TreeNode[] = [];

  constructor(data?: PartialMessage<TreeNodeGroup>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.console.v1alpha1.TreeNodeGroup";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "children", kind: "message", T: TreeNode, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TreeNodeGroup {
    return new TreeNodeGroup().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TreeNodeGroup {
    return new TreeNodeGroup().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TreeNodeGroup {
    return new TreeNodeGroup().fromJsonString(jsonString, options);
  }

  static equals(a: TreeNodeGroup | PlainMessage<TreeNodeGroup> | undefined, b: TreeNodeGroup | PlainMessage<TreeNodeGroup> | undefined): boolean {
    return proto3.util.equals(TreeNodeGroup, a, b);
  }
}

/**
 * @generated from message redpanda.api.console.v1alpha1.NodeAction
 */
export class NodeAction extends Message<NodeAction> {
  /**
   * @generated from field: redpanda.api.console.v1alpha1.PatchOperation operation = 1;
   */
  operation = PatchOperation.UNSPECIFIED;

  /**
   * @generated from field: string path = 2;
   */
  path = "";

  /**
   * @generated from field: string kind = 3;
   */
  kind = "";

  constructor(data?: PartialMessage<NodeAction>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.console.v1alpha1.NodeAction";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "operation", kind: "enum", T: proto3.getEnumType(PatchOperation) },
    { no: 2, name: "path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "kind", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NodeAction {
    return new NodeAction().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NodeAction {
    return new NodeAction().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NodeAction {
    return new NodeAction().fromJsonString(jsonString, options);
  }

  static equals(a: NodeAction | PlainMessage<NodeAction> | undefined, b: NodeAction | PlainMessage<NodeAction> | undefined): boolean {
    return proto3.util.equals(NodeAction, a, b);
  }
}

/**
 * TreeNode represents a tree node.
 *
 * @generated from message redpanda.api.console.v1alpha1.TreeNode
 */
export class TreeNode extends Message<TreeNode> {
  /**
   * @generated from field: string label = 1;
   */
  label = "";

  /**
   * @generated from field: string path = 2;
   */
  path = "";

  /**
   * @generated from field: string kind = 3;
   */
  kind = "";

  /**
   * @generated from field: string type = 4;
   */
  type = "";

  /**
   * @generated from field: repeated redpanda.api.console.v1alpha1.TreeNode children = 5;
   */
  children: TreeNode[] = [];

  /**
   * @generated from field: repeated redpanda.api.console.v1alpha1.TreeNodeGroup gouped_children = 6;
   */
  goupedChildren: TreeNodeGroup[] = [];

  /**
   * @generated from field: bool root_action = 7;
   */
  rootAction = false;

  /**
   * @generated from field: repeated redpanda.api.console.v1alpha1.NodeAction actions = 8;
   */
  actions: NodeAction[] = [];

  /**
   * @generated from field: int32 line_start = 9;
   */
  lineStart = 0;

  /**
   * @generated from field: int32 line_end = 10;
   */
  lineEnd = 0;

  /**
   * @generated from field: repeated string lint_errors = 11;
   */
  lintErrors: string[] = [];

  constructor(data?: PartialMessage<TreeNode>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.console.v1alpha1.TreeNode";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "label", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "kind", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "children", kind: "message", T: TreeNode, repeated: true },
    { no: 6, name: "gouped_children", kind: "message", T: TreeNodeGroup, repeated: true },
    { no: 7, name: "root_action", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 8, name: "actions", kind: "message", T: NodeAction, repeated: true },
    { no: 9, name: "line_start", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 10, name: "line_end", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 11, name: "lint_errors", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TreeNode {
    return new TreeNode().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TreeNode {
    return new TreeNode().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TreeNode {
    return new TreeNode().fromJsonString(jsonString, options);
  }

  static equals(a: TreeNode | PlainMessage<TreeNode> | undefined, b: TreeNode | PlainMessage<TreeNode> | undefined): boolean {
    return proto3.util.equals(TreeNode, a, b);
  }
}

/**
 * GeneratePipelineFlowRequest is the request to retrieve a pipeline flow information.
 *
 * @generated from message redpanda.api.console.v1alpha1.GeneratePipelineFlowRequest
 */
export class GeneratePipelineFlowRequest extends Message<GeneratePipelineFlowRequest> {
  /**
   * @generated from field: redpanda.api.dataplane.v1alpha2.Pipeline pipeline = 1;
   */
  pipeline?: Pipeline;

  constructor(data?: PartialMessage<GeneratePipelineFlowRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.console.v1alpha1.GeneratePipelineFlowRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "pipeline", kind: "message", T: Pipeline },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GeneratePipelineFlowRequest {
    return new GeneratePipelineFlowRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GeneratePipelineFlowRequest {
    return new GeneratePipelineFlowRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GeneratePipelineFlowRequest {
    return new GeneratePipelineFlowRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GeneratePipelineFlowRequest | PlainMessage<GeneratePipelineFlowRequest> | undefined, b: GeneratePipelineFlowRequest | PlainMessage<GeneratePipelineFlowRequest> | undefined): boolean {
    return proto3.util.equals(GeneratePipelineFlowRequest, a, b);
  }
}

/**
 * GeneratePipelineFlowResponse is the response.
 *
 * @generated from message redpanda.api.console.v1alpha1.GeneratePipelineFlowResponse
 */
export class GeneratePipelineFlowResponse extends Message<GeneratePipelineFlowResponse> {
  /**
   * @generated from field: repeated redpanda.api.console.v1alpha1.TreeNode stream = 1;
   */
  stream: TreeNode[] = [];

  /**
   * @generated from field: repeated redpanda.api.console.v1alpha1.TreeNode resources = 2;
   */
  resources: TreeNode[] = [];

  constructor(data?: PartialMessage<GeneratePipelineFlowResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "redpanda.api.console.v1alpha1.GeneratePipelineFlowResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "stream", kind: "message", T: TreeNode, repeated: true },
    { no: 2, name: "resources", kind: "message", T: TreeNode, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GeneratePipelineFlowResponse {
    return new GeneratePipelineFlowResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GeneratePipelineFlowResponse {
    return new GeneratePipelineFlowResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GeneratePipelineFlowResponse {
    return new GeneratePipelineFlowResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GeneratePipelineFlowResponse | PlainMessage<GeneratePipelineFlowResponse> | undefined, b: GeneratePipelineFlowResponse | PlainMessage<GeneratePipelineFlowResponse> | undefined): boolean {
    return proto3.util.equals(GeneratePipelineFlowResponse, a, b);
  }
}

