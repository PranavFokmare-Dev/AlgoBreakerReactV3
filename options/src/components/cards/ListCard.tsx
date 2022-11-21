import React from 'react';
import ParentCard from './ParentCard';

const ListCard = function ({ title, ListComponent }: { title: string; ListComponent: JSX.Element }) {
  return (
    <ParentCard title={title} ChildComponent={ListComponent}/>
  );
};   

export default ListCard;
