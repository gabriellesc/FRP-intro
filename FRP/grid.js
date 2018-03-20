import React from 'react';
import _ from 'lodash';

const Grid = ({ world, height, width }) => (
    <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
            {_.chunk(world, height).map((row, y) => (
                <tr key={'row-' + y}>
                    {row.map((cell, x) => (
                        <td
                            key={'cell-' + x + '-' + y}
                            data-x={x}
                            data-y={y}
                            style={{
                                width: '15px',
                                height: '15px',
                                border: '1px solid black',
                                background: cell ? 'black' : 'white',
                            }}
                        />
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

export default Grid;
