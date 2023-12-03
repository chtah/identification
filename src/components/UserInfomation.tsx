import { IdentifictionDto } from '../dto/dto'
import { CaretRightOutlined } from '@ant-design/icons'

import { Collapse, theme } from 'antd'
import classes from './UserInfomation.module.css'
import dayjs from 'dayjs'

interface IUserInfoProps {
  userInfo: IdentifictionDto
}

const UserInfomation = ({ userInfo }: IUserInfoProps) => {
  const { token } = theme.useToken()
  return (
    <>
      <Collapse
        className={classes.container}
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={[
          {
            key: userInfo.id,
            label: (
              <div className={classes.card}>
                <p className={classes.idNumber}>{userInfo.identification_number}</p>

                <div className={classes.nameThai}>
                  <p className={classes.title}>{userInfo.name_thai}</p>
                  <p className={classes.title}>{userInfo.surename_thai}</p>
                </div>

                <div className={classes.nameEng}>
                  <p className={classes.title}>{userInfo.name_eng}</p>
                  <p className={classes.title}>{userInfo.surename_eng}</p>
                </div>
              </div>
            ),
            children: (
              <div className={classes.detailContainer}>
                <p>เลขบัตรประชาชน : {userInfo.identification_number}</p>
                <p>
                  ชื่อและสกุล : {userInfo.title_thai} {userInfo.name_thai} {userInfo.surename_thai}
                </p>
                <p>
                  Name : {userInfo.title_eng} {userInfo.name_eng} {userInfo.surename_eng}
                </p>
                <p>Date of Birth: {dayjs(userInfo.date_of_birth).format('DD/MM/YYYY')}</p>
                <p>เกิดวันที่ : {dayjs(userInfo.date_of_birth_buddhist).format('DD/MM/YYYY')}</p>
                <p>อายุ : {Number(dayjs().format('YYYY')) - Number(dayjs(userInfo.date_of_birth).format('YYYY'))} ปี</p>
                <p>ศาสนา : {userInfo.religion}</p>
                <p>ที่อยู่ : {userInfo.address}</p>
                <p>Date of Issue : {dayjs(userInfo.date_of_birth).format('DD/MM/YYYY')}</p>
                <p>วันที่ออกบัตร : {dayjs(userInfo.date_of_birth_buddhist).format('DD/MM/YYYY')}</p>
                <p>Date of Expiry : {dayjs(userInfo.date_of_birth).format('DD/MM/YYYY')}</p>
                <p>วันบัตรหมดอายุ : {dayjs(userInfo.date_of_birth_buddhist).format('DD/MM/YYYY')}</p>
              </div>
            ),
          },
        ]}
      />
    </>
  )
}

export default UserInfomation
