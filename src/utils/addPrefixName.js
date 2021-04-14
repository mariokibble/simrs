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

// aku tulis aja yah mas, jika dia itu adalah laki-laki lebih besar dari 18 tahun maka nama depannya adalah Tn, jika dia perempuan sudah menikah dipanggil nya nyonya, jika dia perempuan belum menikah di panggilnya Nn

export default addPrefixName
