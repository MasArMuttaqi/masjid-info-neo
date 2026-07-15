

// Mapping Nama Bulan Hijriah ke Bahasa Indonesia
const hijriMonthNames = {
  '01': 'Muharram',
  '02': 'Safar',
  '03': 'Rabiul Awal',
  '04': 'Rabiul Akhir',
  '05': 'Jumadil Awal',
  '06': 'Jumadil Akhir',
  '07': 'Rajab',
  '08': 'Sya`ban',
  '09': 'Ramadhan',
  '10': 'Syawal',
  '11': 'Dzulkaidah',
  '12': 'Dzulhijjah'
};

// Data Koreksi: "Tahun-Bulan Hijriah": "Tanggal 1 Masehi-nya"
let rukyahCorrection1 = {};
fetch("https://masarmuttaqi.github.io/almanak/data/koreksirukyah.json")
    .then(response => response.json())
    .then(data => {
        rukyahCorrection1 = data;
      // console.log(rukyahCorrection1);

    })
    .catch(err => console.error(err));

function convertToHijriWithRukyah(inputDate = null) {

    let targetDate = inputDate
        ? moment(inputDate, "YYYY-MM-DD")
        : moment();

    // Hasil bawaan moment-hijri
    let defaultYear  = targetDate.format("iYYYY");
    let defaultMonth = targetDate.format("iMM");
    let defaultDay   = targetDate.format("iD");

    // Cek bulan sekarang, sebelumnya, dan sesudahnya
    let candidates = [
        moment(targetDate),
        moment(targetDate).subtract(1, "iMonth"),
        moment(targetDate).add(1, "iMonth")
    ];

    for (let m of candidates) {

        let hYear  = m.format("iYYYY");
        let hMonth = m.format("iMM");
        let key = `${hYear}-${hMonth}`;

        if (rukyahCorrection1[key]) {

            let start = moment(rukyahCorrection1[key], "YYYY-MM-DD");
            let diff = targetDate.diff(start, "days");

            // hanya berlaku jika tanggal berada di bulan tersebut
            if (diff >= 0 && diff <= 30) {
                return formatOutput(diff + 1, hMonth, hYear);
            }
        }
    }

    // Tidak ada data rukyah → gunakan hasil moment-hijri
    return formatOutput(defaultDay, defaultMonth, defaultYear);
}

// Helper untuk merapikan tampilan
function formatOutput(day, monthNum, year) {
  let monthName = hijriMonthNames[monthNum] || monthNum;
  return `${day} ${monthName} ${year}`;
}