import useIdentificationGet from '../hooks/useIdentificationGet'
import { Button, Form, Space, Input, Select, Pagination, Card, QRCode } from 'antd'
import classes from './Search.module.css'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import dayjs from 'dayjs'
import useIdentificationDelete from '../hooks/useIdentificationDelete'
import { Toaster } from 'react-hot-toast'

interface DataType {
  key: React.Key
  nameThai: JSX.Element
  nameEng: JSX.Element
  age: number
  id_number: string
  description: JSX.Element
  delete: string
}

const Search = () => {
  const { userData, fetchData } = useIdentificationGet()
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [form] = Form.useForm()
  const { Option } = Select
  const [searchField, setSearchField] = useState<string>('')
  const [searchType, setSearchType] = useState<string>('')
  const [isFilteredUserData, setIsFilteredUserData] = useState<boolean>(false)
  const { SubmitDelete } = useIdentificationDelete()
  //const [idNumber, setIdNumber] = useState<string>('')

  const columns: ColumnsType<DataType> = [
    { title: 'ชื่อ-สกุล', dataIndex: 'nameThai', key: 'nameThai' },
    { title: 'Name-Surename', dataIndex: 'nameEng', key: 'nameEng' },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortDirections: ['descend', 'ascend'],
    },
    { title: 'เลขบัตรประจำตัวประชาชน', dataIndex: 'id_number', key: 'id_number' },
    {
      title: 'คำสั่ง',
      dataIndex: 'delete',
    },
  ]

  const onFinish = (
    values: any, // eslint-disable-line
  ) => {
    setSearchField(values.search)
    setSearchType(values.search_type)
    setIsFilteredUserData(true)
  }

  const onReset = () => {
    form.resetFields()
    setIsFilteredUserData(false)
  }

  const onShowSizeChange = (current: number, pageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(current)
    console.log((current - 1) * pageSize)
    console.log(current, pageSize)
  }

  const onPageChange = (current: number, pageSize: number) => {
    setCurrentPage(current)
    setPageSize(pageSize)
    console.log(current)
    console.log(pageSize)
  }

  const onDelete = async (id_number: string) => {
    try {
      await SubmitDelete(id_number)
      await fetchData()
    } catch (error) {
      console.error('Error delete data', error)
    }
  }
  const filteredUserData =
    userData &&
    userData.filter((data) =>
      searchType === 'id_number'
        ? data.identification_number.includes(searchField)
        : data.name_thai.toLocaleLowerCase().includes(searchField.toLocaleLowerCase()) ||
          data.name_eng.toLocaleLowerCase().includes(searchField.toLocaleLowerCase()) ||
          data.surename_thai.toLocaleLowerCase().includes(searchField.toLocaleLowerCase()) ||
          data.surename_eng.toLocaleLowerCase().includes(searchField.toLocaleLowerCase()),
    )

  return (
    <>
      <Toaster />
      <div className={classes.containerSearch}>
        <Form form={form} name="advanced_search" onFinish={onFinish} className={classes.form}>
          <div className={classes.field}>
            <Space.Compact>
              <Form.Item name="search" noStyle rules={[{ required: true, message: 'กรุณาใส่คำค้นหา' }]}>
                <Input style={{ width: '300px' }} placeholder="ค้นหา" />
              </Form.Item>
              <Form.Item name="search_type" noStyle rules={[{ required: true, message: 'กรุณาเลือกหมวดหมู่' }]}>
                <Select placeholder="หมวดหมู่" style={{ width: '200px' }}>
                  <Option value="id_number">เลขบัตรประชาชน</Option>
                  <Option value="name_or_surename">ชื่อ หรือ นามสกุล</Option>
                </Select>
              </Form.Item>
            </Space.Compact>
          </div>

          <div className={classes.button}>
            <Space size="small">
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button onClick={onReset}>Clear</Button>
            </Space>
          </div>
        </Form>
      </div>

      <div className={classes.container}>
        <Table
          columns={columns}
          pagination={false}
          className={classes.table}
          expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
          }}
          dataSource={
            isFilteredUserData
              ? filteredUserData &&
                filteredUserData.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((data) => {
                  return {
                    key: data.id,
                    nameThai: (
                      <div>
                        {data.name_thai} {data.surename_thai}
                      </div>
                    ),
                    nameEng: (
                      <div>
                        {data.name_eng} {data.surename_eng}
                      </div>
                    ),
                    age: Number(dayjs().format('YYYY')) - Number(dayjs(data.date_of_birth).format('YYYY')),
                    id_number: data.identification_number,
                    description: (
                      <Card title="ข้อมูลเพิ่มเติม" style={{ width: 700, margin: 'auto' }}>
                        <div className={classes.containerData}>
                          <div>
                            <p>เลขบัตรประชาชน : {data.identification_number}</p>
                            <p>
                              ชื่อและสกุล : {data.title_thai} {data.name_thai} {data.surename_thai}
                            </p>
                            <p>
                              Name : {data.title_eng} {data.name_eng} {data.surename_eng}
                            </p>
                            <p>Date of Birth: {dayjs(data.date_of_birth).format('DD/MM/YYYY')}</p>
                            <p>เกิดวันที่ : {dayjs(data.date_of_birth_buddhist).format('DD/MM/YYYY')}</p>
                            <p>
                              อายุ : {Number(dayjs().format('YYYY')) - Number(dayjs(data.date_of_birth).format('YYYY'))}{' '}
                              ปี
                            </p>
                            <p>ศาสนา : {data.religion}</p>
                            <p>ที่อยู่ : {data.address}</p>
                            <p>Date of Issue : {dayjs(data.date_of_birth).format('DD/MM/YYYY')}</p>
                            <p>วันที่ออกบัตร : {dayjs(data.date_of_birth_buddhist).format('DD/MM/YYYY')}</p>
                            <p>Date of Expiry : {dayjs(data.date_of_birth).format('DD/MM/YYYY')}</p>
                            <p>วันบัตรหมดอายุ : {dayjs(data.date_of_birth_buddhist).format('DD/MM/YYYY')}</p>
                          </div>
                          <div className={classes.dataRight}>
                            <QRCode value={`${data.title_eng} ${data.name_eng} ${data.surename_eng}`} />
                          </div>
                        </div>
                      </Card>
                    ),
                    delete: (
                      <Button danger onClick={() => onDelete(data.identification_number)}>
                        ลบ
                      </Button>
                    ),
                  }
                })
              : userData &&
                userData.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((data) => {
                  return {
                    key: data.id,
                    nameThai: (
                      <div>
                        {data.name_thai} {data.surename_thai}
                      </div>
                    ),
                    nameEng: (
                      <div>
                        {data.name_eng} {data.surename_eng}
                      </div>
                    ),
                    age: Number(dayjs().format('YYYY')) - Number(dayjs(data.date_of_birth).format('YYYY')),
                    id_number: data.identification_number,
                    description: (
                      <Card title="ข้อมูลเพิ่มเติม" style={{ width: 700, margin: 'auto' }}>
                        <div className={classes.containerData}>
                          <div>
                            <p>เลขบัตรประชาชน : {data.identification_number}</p>
                            <p>
                              ชื่อและสกุล : {data.title_thai} {data.name_thai} {data.surename_thai}
                            </p>
                            <p>
                              Name : {data.title_eng} {data.name_eng} {data.surename_eng}
                            </p>
                            <p>Date of Birth: {dayjs(data.date_of_birth).format('DD/MM/YYYY')}</p>
                            <p>เกิดวันที่ : {dayjs(data.date_of_birth_buddhist).format('DD/MM/YYYY')}</p>
                            <p>
                              อายุ : {Number(dayjs().format('YYYY')) - Number(dayjs(data.date_of_birth).format('YYYY'))}{' '}
                              ปี
                            </p>
                            <p>ศาสนา : {data.religion}</p>
                            <p>ที่อยู่ : {data.address}</p>
                            <p>Date of Issue : {dayjs(data.date_of_birth).format('DD/MM/YYYY')}</p>
                            <p>วันที่ออกบัตร : {dayjs(data.date_of_birth_buddhist).format('DD/MM/YYYY')}</p>
                            <p>Date of Expiry : {dayjs(data.date_of_birth).format('DD/MM/YYYY')}</p>
                            <p>วันบัตรหมดอายุ : {dayjs(data.date_of_birth_buddhist).format('DD/MM/YYYY')}</p>
                          </div>
                          <div className={classes.dataRight}>
                            <QRCode value={`${data.title_eng} ${data.name_eng} ${data.surename_eng}`} />
                          </div>
                        </div>
                      </Card>
                    ),
                    delete: (
                      <Button danger onClick={() => onDelete(data.identification_number)}>
                        ลบ
                      </Button>
                    ),
                  }
                })
          }
        />

        <Pagination
          className={classes.pagination}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          onChange={onPageChange}
          defaultCurrent={1}
          total={userData !== null ? userData.length : 500}
        />
      </div>
    </>
  )
}
export default Search
