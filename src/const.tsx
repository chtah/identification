import dayjs from 'dayjs'

const titleThai = ['นาย', 'นาง', 'นางสาว']
const nameThai = ['สุรยุทธ์', 'ปิติภูมิ', 'วริศ', 'บดินทร์', 'ชาลี', 'กรภัทร', 'นนทิน', 'ธนาทิพย์', 'ภาวิดา ', 'ชุติมา']
const surenameThai = [
  'ธรรมวงศ์',
  'เจริญทิพย์',
  'ศิริไล',
  'ก้องเกษมทรัพย์',
  'ศรีสร้อย',
  'บุญเทพ',
  'แสงสว่าง',
  'คมสกุล',
  'ก้องกิจ',
  'บุญขาว',
]
const nameEng = [
  'Surayuth',
  'Pitipoom',
  'Warit',
  'Bodin',
  'Chalee',
  'Korapat',
  'Nonnatin',
  'Thanatip',
  'Pavida',
  'Chutima',
]
const surenameEng = [
  'Thammawong',
  'Jaroentip',
  'Sirilai',
  'Gongkasemsab',
  'Srisoi',
  'Boonthep',
  'Sangsawang',
  'Komsakul',
  'Kongkij',
  'Boonkaow',
]
const titleEnglish = ['Mr.', 'Mrs.', 'Miss']
const religion = ['พุทธ', 'คริสต์', 'อิสลาม']

const random13DigitNumber = () => {
  const randomNumber = Math.floor(1000000000000 + Math.random() * 9000000000000)
  return String(randomNumber)
}

const random3DigitNumber = () => {
  const randomNumber = Math.floor(Math.random() * 3)
  return randomNumber
}

const random10DigitNumber = () => {
  const randomNumber = Math.floor(Math.random() * 10)
  return randomNumber
}

const random12DigitNumber = () => {
  const randomNumber = Math.floor(Math.random() * 12) + 1
  return randomNumber
}

const random30DigitNumber = () => {
  const randomNumber = Math.floor(Math.random() * 30) + 1
  return randomNumber
}

function randomYears(): number {
  const startYear = 1920
  const endYear = 2023
  return Math.floor(Math.random() * (endYear - startYear + 1)) + startYear
}

const randomDate = () => {
  const randomDay = random30DigitNumber()
  const randomMonth = random12DigitNumber()
  const randomYear = randomYears()
  return dayjs(`${randomYear}-${randomMonth}-${randomDay}`)
}

const randomText = () => {
  const loremWords = [
    'Lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
  ]

  const getRandomWord = (): string => loremWords[Math.floor(Math.random() * loremWords.length)]

  const loremLength = 10
  const randomLorem = Array.from({ length: loremLength }, getRandomWord).join(' ')

  return randomLorem
}

export const randomData = () => {
  const random3_1 = random3DigitNumber()
  const random3_2 = random3DigitNumber()
  const random10_1 = random10DigitNumber()
  const random10_2 = random10DigitNumber()
  const randomIdentification = random13DigitNumber()
  const randomTitleThai = titleThai[random3_1]
  const randomTitleEnglish = titleEnglish[random3_1]
  const randomNameThai = nameThai[random10_1]
  const randomNameEnglish = nameEng[random10_1]
  const randomSurenameThai = surenameThai[random10_2]
  const randomSurenameEnglish = surenameEng[random10_2]
  const randomReligion = religion[random3_2]
  const randomBirthDay = randomDate()
  const randomIssue = randomDate()
  const randomExpiry = randomDate()
  const randomAddress = randomText()

  return {
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
  }
}
