import { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';

const sourceHandleStyleA = { left: 50 };
const sourceHandleStyleB = {
    right: 50,
    left: 'auto',
};

const CustomNode = ({ data, xPos, yPos }) => {
    return (
        <>
            <NodeResizer />
            <Handle type="target" position={Position.Top} />
            <div>
                <div>
                    Label: <strong>{data.label}</strong>
                </div>
                <div>
                    Position:{' '}
                    <strong>
                        {xPos.toFixed(2)},{yPos.toFixed(2)}
                    </strong>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={sourceHandleStyleA}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={sourceHandleStyleB}
            />
        </>
    );
};

export default memo(CustomNode);

