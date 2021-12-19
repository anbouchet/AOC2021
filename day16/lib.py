
from dataclasses import dataclass
from enum import IntEnum
from typing import List
import math


class OperatorType(IntEnum):
    SUM = 0
    PRODUCT = 1
    MINIMUM = 2
    MAXIMUM = 3
    GREATER_THAN = 5
    LESS_THAN = 6
    EQUAL = 7

class Node:
    def __init__(self, version: int) -> None:
        self.version = version


class LiteralNode(Node):
    __match_args__ = ('value',)

    def __init__(self, value: int, version: int):
        super().__init__(version)
        self.value = value

    def __repr__(self) -> str:
        return f"LiteralNode_v{self.version}({self.value})"


class OperatorNode(Node):
    __match_args__ = ('type', 'children')

    def __init__(self, children: List[Node], type: int, version: int) -> None:
        super().__init__(version)
        self.type = type
        self.children = children

    def __repr__(self) -> str:
        return f"OperatorNode_v{self.version}({self.children!r})"


def hex_str_to_bin_str(hex_str: str) -> str:
    return ''.join(f"{int(c,16):04b}" for c in hex_str)


def slices(string: str, length: int):
    count = len(string) // length
    for i in range(count):
        yield string[i * length: (i + 1) * length]


def _parse_literal(literal_bin: str, version: int):
    value_string = ''
    pos = 0
    slice_length = 5
    for slice in slices(literal_bin, slice_length):
        pos += slice_length
        has_next = slice[0]
        bits = slice[1:]
        value_string += bits
        if has_next == '0':
            break
    return LiteralNode(int(value_string, 2), version), pos


def _parse_operator(op_bin: str, type: int, version: str):
    length_type_id = op_bin[0]
    op_bits = op_bin[1:]
    op_end_pos = 1
    if length_type_id == '0':
        length = int(op_bits[:15], 2)
        sub_packets_bits = op_bits[15:][:length]
        nodes, _ = _parse_internal(sub_packets_bits, math.inf)
        op_end_pos += length + 15
        return OperatorNode(nodes, type, version), op_end_pos
    else:
        num_sub_packets = int(op_bits[:11], 2)
        rest = op_bits[11:]
        nodes, end_pos = _parse_internal(rest, num_sub_packets)
        op_end_pos += end_pos + 11
        return OperatorNode(nodes, type, version), op_end_pos


def _parse_internal(packet_bin: str, max_top_packets: int | float = 1):
    top_packets: List[Node] = []
    packets_end_pos: int = 0
    while len(top_packets) < max_top_packets and len(packet_bin) > 6:
        version = int(packet_bin[:3], 2)
        type = int(packet_bin[3:6], 2)
        rest = packet_bin[6:]
        packets_end_pos += 6
        match type:
            # literal
            case 4:
                node, end_pos = _parse_literal(rest, version)
                top_packets.append(node)
                packet_bin = rest[end_pos:]
                packets_end_pos += end_pos
            # operator
            case _:
                node, end_pos = _parse_operator(rest, type, version)
                top_packets.append(node)
                packet_bin = rest[end_pos:]
                packets_end_pos += end_pos

    return top_packets, packets_end_pos


def parse(packet_bin: str, max_top_packets: int | float = 1):
    res = _parse_internal(packet_bin, max_top_packets)
    return res[0]


def version_sum(root: Node) -> int:
    match root:
        case OperatorNode(children=children):
            children_sum = sum(version_sum(n) for n in children)
            return root.version + children_sum
        case _:
            return root.version


def eval_tree(root: Node) -> int:
    match root:
        case LiteralNode(value):
            return value

        case OperatorNode(OperatorType.SUM, children):
            return sum(eval_tree(n) for n in children)

        case OperatorNode(OperatorType.PRODUCT, children):
            return math.prod(eval_tree(n) for n in children)

        case OperatorNode(OperatorType.MINIMUM, children):
            return min(eval_tree(n) for n in children)

        case OperatorNode(OperatorType.MAXIMUM, children):
            return max(eval_tree(n) for n in children)

        case OperatorNode(OperatorType.GREATER_THAN, [left, right]):
            return int(eval_tree(left) > eval_tree(right))

        case OperatorNode(OperatorType.LESS_THAN, [left, right]):
            return int(eval_tree(left) < eval_tree(right))

        case OperatorNode(OperatorType.EQUAL, [left, right]):
            return int(eval_tree(left) == eval_tree(right))
