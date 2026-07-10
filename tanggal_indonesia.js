function formatTanggalIndo(tanggalString) {
  const bulanIndo = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const [tahun, bulan, tanggal] = tanggalString.split('-');
  const namaBulan = bulanIndo[parseInt(bulan) - 1];
  
  return `${parseInt(tanggal)} ${namaBulan} ${tahun}`;
}