import UserInfomation from '../components/UserInfomation'
import useIdentificationGet from '../hooks/useIdentificationGet'
import { Button, Form, Space, Input, Select, Pagination } from 'antd'
import classes from './Search.module.css'
import { useState } from 'react'

const Search = () => {
  const { userData } = useIdentificationGet()
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [form] = Form.useForm()
  const { Option } = Select
  const [searchField, setSearchField] = useState<string>('')
  const [searchType, setSearchType] = useState<string>('')
  const [isFilteredUserData, setIsFilteredUserData] = useState<boolean>(false)

  const onFinish = (values: any) => {
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
        {isFilteredUserData
          ? filteredUserData &&
            filteredUserData.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((data) => {
              return <UserInfomation key={data.id} userInfo={data} />
            })
          : userData &&
            userData.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((data) => {
              return <UserInfomation key={data.id} userInfo={data} />
            })}
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
