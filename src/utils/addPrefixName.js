// eslint-disable-next-line consistent-return
const addPrefixName = ({
  jenisKelamin, statusPernikahan, tanggalLahir,
}) => {
  let prefix = ''
  const umur = new Date().getFullYear() - new Date(tanggalLahir).getFullYear()
  if (jenisKelamin === 'Laki-laki') {
    if (umur > 18) {
      prefix = 'Tn.'
    } else {
      prefix = 'An.'
    }
  } else if (statusPernikahan === 'sudah_menikah') {
    prefix = 'Ny.'
  } else if (umur < 18) {
    prefix = 'Anak'
  } else {
    prefix = 'Nn.'
  }

  return `${prefix}`
}

export default addPrefixName
