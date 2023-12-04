import useIdentificationGet from '../hooks/useIdentificationGet'
import { Button, Form, Space, Input, Select, Pagination, Card, QRCode, Descriptions } from 'antd'
import classes from './All.module.css'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import dayjs from 'dayjs'
import useIdentificationDelete from '../hooks/useIdentificationDelete'
import { Toaster } from 'react-hot-toast'
// import vCardsJS from 'vcards-js'

// const vCard = vCardsJS()
// vCard.firstName = 'John'
// vCard.lastName = 'Doe'
// vCard.workPhone = '0999999999'
// vCard.birthday = new Date(1985, 12, 1)
// vCard.cellPhone = '0999999999'
// console.log(vCard.getFormattedString())
// For see vCard format

interface DataType {
  key: React.Key
  nameThai: JSX.Element
  nameEng: JSX.Element
  age: number
  id_number: string
  description: JSX.Element
  delete: string
}

const All = () => {
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
        <p className={classes.count}>Total : {userData !== null ? userData.length : 1}</p>
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
                      <Card title="ข้อมูลเพิ่มเติม" style={{ width: '80%', margin: 'auto' }}>
                        <div className={classes.containerData}>
                          <div className={classes.dataLeft}>
                            <Descriptions
                              bordered
                              size="small"
                              items={[
                                {
                                  label: 'เลขบัตรประชาชน',
                                  children: `${data.identification_number}`,
                                  span: 5,
                                },
                                {
                                  label: 'ชื่อและสกุล',
                                  children: `${data.title_thai} ${data.name_thai} ${data.surename_thai}`,
                                  span: 5,
                                },
                                {
                                  label: 'Name',
                                  children: `${data.title_eng} ${data.name_eng} ${data.surename_eng}`,
                                  span: 5,
                                },
                                {
                                  label: 'Date of Birth',
                                  children: `${dayjs(data.date_of_birth).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'เกิดวันที่',
                                  children: `${dayjs(data.date_of_birth_buddhist).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'อายุ',
                                  children: `${
                                    Number(dayjs().format('YYYY')) - Number(dayjs(data.date_of_birth).format('YYYY'))
                                  } ปี`,
                                  span: 5,
                                },
                                {
                                  label: 'ศาสนา',
                                  children: `${data.religion}`,
                                  span: 5,
                                },
                                {
                                  label: 'ที่อยู่',
                                  children: `${data.address}`,
                                  span: 5,
                                },
                                {
                                  label: 'Date of Issue',
                                  children: `${dayjs(data.date_of_issue).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'วันที่ออกบัตร',
                                  children: `${dayjs(data.date_of_issue_buddhist).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'Date of Expiry',
                                  children: `${dayjs(data.date_of_expiry).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'วันบัตรหมดอายุ',
                                  children: `${dayjs(data.date_of_expiry_buddhist).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'เบอร์โทรศัพท์',
                                  children: `${data.mobile_phone !== '' ? data.mobile_phone : 'ไม่มี'}`,
                                  span: 5,
                                },
                              ]}
                            />
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
                      <Card title="ข้อมูลเพิ่มเติม" style={{ width: '80%', margin: 'auto' }}>
                        <div className={classes.containerData}>
                          <div className={classes.dataLeft}>
                            <Descriptions
                              bordered
                              size="small"
                              items={[
                                {
                                  label: 'เลขบัตรประชาชน',
                                  children: `${data.identification_number}`,
                                  span: 5,
                                },
                                {
                                  label: 'ชื่อและสกุล',
                                  children: `${data.title_thai} ${data.name_thai} ${data.surename_thai}`,
                                  span: 5,
                                },
                                {
                                  label: 'Name',
                                  children: `${data.title_eng} ${data.name_eng} ${data.surename_eng}`,
                                  span: 5,
                                },
                                {
                                  label: 'Date of Birth',
                                  children: `${dayjs(data.date_of_birth).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'เกิดวันที่',
                                  children: `${dayjs(data.date_of_birth_buddhist).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'อายุ',
                                  children: `${
                                    Number(dayjs().format('YYYY')) - Number(dayjs(data.date_of_birth).format('YYYY'))
                                  } ปี`,
                                  span: 5,
                                },
                                {
                                  label: 'ศาสนา',
                                  children: `${data.religion}`,
                                  span: 5,
                                },
                                {
                                  label: 'ที่อยู่',
                                  children: `${data.address}`,
                                  span: 5,
                                },
                                {
                                  label: 'Date of Issue',
                                  children: `${dayjs(data.date_of_issue).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'วันที่ออกบัตร',
                                  children: `${dayjs(data.date_of_issue_buddhist).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'Date of Expiry',
                                  children: `${dayjs(data.date_of_expiry).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'วันบัตรหมดอายุ',
                                  children: `${dayjs(data.date_of_expiry_buddhist).format('DD/MM/YYYY')}`,
                                  span: 5,
                                },
                                {
                                  label: 'เบอร์โทรศัพท์',
                                  children: `${data.mobile_phone !== '' ? data.mobile_phone : 'ไม่มี'}`,
                                  span: 5,
                                },
                              ]}
                            />
                          </div>
                          <div className={classes.dataRight}>
                            {data.mobile_phone !== '' ? (
                              <>
                                <p style={{ textAlign: 'center', marginBottom: '5px' }}>Your vCard</p>
                                <QRCode
                                  value={`
BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${data.name_eng} ${data.surename_eng}
N;CHARSET=UTF-8:${data.surename_eng};${data.name_eng};;;
BDAY:${dayjs(data.date_of_birth).format('YYYYMMDD')}
TEL;TYPE=CELL:${data.mobile_phone}
END:VCARD`}
                                  size={250}
                                />
                              </>
                            ) : null}
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
          total={userData !== null ? userData.length : 0}
        />
      </div>
    </>
  )
}
export default All
