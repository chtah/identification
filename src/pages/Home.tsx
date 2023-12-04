import classes from './Home.module.css'
import { Button, Form, Input, Select, Space, DatePicker, Tooltip } from 'antd'
import useIdentificationCreate from '../hooks/useIdentificationCreate'
import { Toaster } from 'react-hot-toast'
import { randomData } from '../const'
import useIdentificationGet from '../hooks/useIdentificationGet'
import CountUp from 'react-countup'
import { InfoCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { Option } = Select

const Home = () => {
  const { Submit, isLoadingButton } = useIdentificationCreate()
  const [form] = Form.useForm()
  const { userData, fetchData } = useIdentificationGet()

  const onReset = () => {
    form.resetFields()
  }

  const onFill = () => {
    const {
      randomIdentification,
      randomTitleThai,
      randomTitleEnglish,
      randomNameThai,
      randomNameEnglish,
      randomSurenameThai,
      randomSurenameEnglish,
      randomReligion,
      randomBirthDay,
      randomIssue,
      randomExpiry,
      randomAddress,
      randomMobilePhone,
    } = randomData()

    form.setFieldsValue({
      identification_number: randomIdentification,
      title_thai: randomTitleThai,
      name_thai: randomNameThai,
      surename_thai: randomSurenameThai,
      title_eng: randomTitleEnglish,
      name_eng: randomNameEnglish,
      surename_eng: randomSurenameEnglish,
      date_of_birth: randomBirthDay,
      religion: randomReligion,
      address: randomAddress,
      date_of_issue: randomIssue,
      date_of_expiry: randomExpiry,
      mobile_phone: randomMobilePhone,
    })
  }

  const onFinish = async (
    values: any, // eslint-disable-line
  ) => {
    const ISOFormatBirthDayDate = new Date(`${values.date_of_birth.$d}`).toISOString()
    const ISOFormatIssueDate = new Date(`${values.date_of_issue.$d}`).toISOString()
    const ISOFormatExpiryDate = new Date(`${values.date_of_expiry.$d}`).toISOString()
    const allDate = {
      date_of_birth: ISOFormatBirthDayDate,
      date_of_issue: ISOFormatIssueDate,
      date_of_expiry: ISOFormatExpiryDate,
    }

    const userData = { ...values, ...allDate }
    console.log(userData)
    try {
      if (userData !== null) await Submit(userData)
      onReset()
      await fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Toaster />
      <div className={classes.container}>
        <p className={classes.title}>Insert Your Information</p>
        <div className={classes.totalRecord}>
          <p>Total Record</p>
          {userData !== null ? <CountUp className={classes.count} start={0} end={userData.length} /> : null}
        </div>
        <Form
          name="complex-form"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 1000 }}
          className={classes.containerForm}
          form={form}
        >
          <Form.Item label="เลขบัตรประชาชน (Identification Number)">
            <Space>
              <Form.Item
                name="identification_number"
                noStyle
                rules={[
                  { required: true, message: 'ID Card is required' },
                  () => ({
                    validator(_, value) {
                      if (value.split('').length === 13 && !isNaN(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Only use Number 13 Digit'))
                    },
                  }),
                ]}
              >
                <Input style={{ width: 160 }} placeholder="เลขบัตรประชาชน" />
              </Form.Item>
            </Space>
          </Form.Item>

          <Form.Item label="ชื่อ ภาษาไทย (Name in Thai)">
            <Space.Compact>
              <Form.Item name="title_thai" noStyle rules={[{ required: true, message: 'กรุณาเลือกคำนำหน้า' }]}>
                <Select placeholder="คำนำหน้า" style={{ width: '100px' }}>
                  <Option value="นาย">นาย</Option>
                  <Option value="นางสาว">นางสาว</Option>
                  <Option value="นาง">นาง</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="name_thai"
                noStyle
                rules={[
                  { required: true, message: 'กรุณาใส่ชื่อ' },
                  () => ({
                    validator(_, value) {
                      if (/^[ก-๙]+$/.test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('กรุณาใช้ ก-ฮ'))
                    },
                  }),
                ]}
              >
                <Input style={{ width: '200px' }} placeholder="ชื่อ" />
              </Form.Item>
              <Form.Item
                name="surename_thai"
                noStyle
                rules={[
                  { required: true, message: 'กรุณาใส่นามสกุล' },
                  () => ({
                    validator(_, value) {
                      if (/^[ก-๙]+$/.test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('กรุณาใช้ ก-ฮ'))
                    },
                  }),
                ]}
              >
                <Input style={{ width: '200px' }} placeholder="นามสกุล" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item label="ชื่อ ภาษาอังกฤษ (Name in English)">
            <Space.Compact>
              <Form.Item name="title_eng" noStyle rules={[{ required: true, message: 'กรุณาเลือกคำนำหน้า' }]}>
                <Select placeholder="Title" style={{ width: '100px' }}>
                  <Option value="Mr.">Mr.</Option>
                  <Option value="Miss">Miss</Option>
                  <Option value="Mrs.">Mrs.</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="name_eng"
                noStyle
                rules={[
                  { required: true, message: 'กรุณาใส่ชื่อภาษาอังกฤษ' },
                  () => ({
                    validator(_, value) {
                      if (/^[A-Za-z]+$/.test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Only use A-Z or a-z'))
                    },
                  }),
                ]}
              >
                <Input style={{ width: '200px' }} placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="surename_eng"
                noStyle
                rules={[
                  { required: true, message: 'กรุณาใส่นามสกุลภาษาอังกฤษ' },
                  () => ({
                    validator(_, value) {
                      if (/^[A-Za-z]+$/.test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Only use A-Z or a-z'))
                    },
                  }),
                ]}
              >
                <Input style={{ width: '200px' }} placeholder="Surename" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item label="วันเกิด (Birthday)">
            <Form.Item
              name="date_of_birth"
              rules={[
                { type: 'object' as const, required: true, message: 'กรุณาเลือกวันเกิด' },
                () => ({
                  validator(_, value) {
                    if (dayjs(value).valueOf() <= dayjs().valueOf()) {
                      console.log(dayjs(value).valueOf())
                      console.log(dayjs().valueOf())
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('วันเกิดไม่ถูกต้อง'))
                  },
                }),
              ]}
              noStyle
            >
              <DatePicker placeholder="วันเกิด" />
            </Form.Item>
          </Form.Item>

          <Form.Item label="ศาสนา (Religion)">
            <Space.Compact>
              <Form.Item name="religion" noStyle rules={[{ required: true, message: 'กรุณาเลือกศาสนา' }]}>
                <Select placeholder="ศาสนา" style={{ width: '100px' }}>
                  <Option value="พุทธ">พุทธ</Option>
                  <Option value="คริสต์">คริสต์</Option>
                  <Option value="อิสลาม">อิสลาม</Option>
                </Select>
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item label="ที่อยู่ (Address)">
            <Space.Compact>
              <Form.Item name="address" noStyle rules={[{ required: true, message: 'กรุณาใส่ที่อยู่' }]}>
                <Input style={{ width: '500px' }} placeholder="ที่อยู่" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item label="วันออกบัตร (Date of Issue)">
            <Form.Item
              name="date_of_issue"
              rules={[{ type: 'object' as const, required: true, message: 'กรุณาเลือกวันออกบัตร' }]}
              noStyle
            >
              <DatePicker placeholder="วันออกบัตร" />
            </Form.Item>
          </Form.Item>

          <Form.Item label="วันบัตรหมดอายุ (Date of Expiry)">
            <Form.Item
              name="date_of_expiry"
              rules={[{ type: 'object' as const, required: true, message: 'กรุณาเลือกวันบัตรหมดอายุ' }]}
              noStyle
            >
              <DatePicker placeholder="วันบัตรหมดอายุ" />
            </Form.Item>
          </Form.Item>

          <Form.Item label="เบอร์โทรศัพท์ (Mobile Phone)">
            <Space.Compact>
              <Form.Item
                name="mobile_phone"
                noStyle
                rules={[
                  { required: false },
                  () => ({
                    validator(_, value) {
                      if ((/^[0-9]+$/.test(value) && value.length === 10) || value.length === 0) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('กรุณาใช้ 0-9 จำนวน 10 หลัก'))
                    },
                  }),
                ]}
              >
                <Input style={{ width: '160px' }} placeholder="(Optional)" />
              </Form.Item>
              <Tooltip title="Optional for create vCard" color="blue">
                <InfoCircleOutlined style={{ marginLeft: '10px' }} />
              </Tooltip>
            </Space.Compact>
          </Form.Item>

          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              {isLoadingButton ? 'Submitting' : 'Submit'}
            </Button>
            <Button
              htmlType="button"
              onClick={onFill}
              style={{ color: '#fff', backgroundColor: '#9ADE7B', marginLeft: '20px' }}
            >
              Generate
            </Button>
            <Button type="primary" danger htmlType="button" onClick={onReset} style={{ marginLeft: '20px' }}>
              Clear
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Home
