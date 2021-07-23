import React  from 'react';

interface MarginProps {
    height: string;
    width: string;
}
export const Margin:React.FC<MarginProps> = ({height,width}) => {
    return (
        <div style={{
            border: '4px double blue',
            height: height,
            width: width
        }}/>
    );
}
export default Margin;
