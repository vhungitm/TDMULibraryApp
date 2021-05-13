import React from 'react';
import InforItem from './InforItem';

const Infor = ({data}) => {
    return (
        <>
            <InforItem iconName="note" title="Được viết bởi" value={data.Authors} />
            <InforItem iconName="user" title="Nhà xuất bản" value={data.PublisherName} />
            <InforItem iconName="calendar" title="Năm xuất bản" value={data.PublishYear} />
            <InforItem iconName="docs" title="Số lượng bản sao" value={data.Quantity} />
            <InforItem iconName="book-open" title="Số trang" value={data.PageNumber} />
            <InforItem iconName="size-fullscreen" title="Kích thước" value={data.Size + ' cm'} />
            <InforItem iconName="drop" title="Trọng lượng" value={data.Weight + ' gr'} />
        </>
    )
}

export default Infor;