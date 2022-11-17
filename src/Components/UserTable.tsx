import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { User } from "constants/types";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getUsers } from "store/users/actions";
import { selectUsers } from "store/users/userSlice";

interface DataType {
  key: React.Key;
  [keys: string]: any;
  kids: {
    [keys: string]: any;
  };
}

interface ColumnProps {
  title: string;
  dataIndex: string;
  key: string;
}

const UserTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const [columns, setColumns] = useState<ColumnProps[]>([]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const tableData = useMemo(() => {
    let data: DataType[] = [];
    let columns: ColumnProps[] = [];
    if (users.length) {
      Object.keys(users[0].data).forEach((recordKey: string) => {
        columns.push({
          title: recordKey,
          dataIndex: recordKey,
          key: recordKey,
        });
      });
      setColumns(columns);
      users.forEach((record: User, index: number) => {
        data.push({
          key: `User ${index}`,
          ...record.data,
          kids: record.kids,
        });
      });
    }
    return data;
  }, [users]);

  const rowExpandable = ({ kids }: DataType) => {
    return Object.keys(kids).length > 0;
  };

  const rowExpandableRender = ({ kids }: DataType) => {
    const columns: TableColumnsType<DataType> = [];

    const data: DataType[] = [];
    for (const key in kids) {
      if (kids[key].records) {
        Object.keys(kids[key].records[0].data).forEach((recordKey: string) => {
          columns.push({
            title: recordKey,
            dataIndex: recordKey,
            key: recordKey,
          });
        });
      }
      kids[key].records?.forEach((record: User, index: number) => {
        data.push({
          key: `${key} ${index}`,
          ...record.data,
          kids: record.kids,
        });
      });
    }

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        expandable={{
          expandedRowRender: rowExpandableRender,
          rowExpandable: rowExpandable,
          defaultExpandedRowKeys: ["0"],
        }}
      />
    );
  };

  return (
    <div className="shadow">
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: rowExpandableRender,
          rowExpandable: rowExpandable,
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={tableData}
      />
    </div>
  );
};

export default UserTable;
