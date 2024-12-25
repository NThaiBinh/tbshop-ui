import * as XLSX from 'xlsx'

// Hàm để xuất dữ liệu ra file Excel
function exportExcel(data) {
   // Chuyển đổi dữ liệu thành worksheet
   const ws = XLSX.utils.json_to_sheet(data)

   // Tạo workbook từ worksheet
   const wb = XLSX.utils.book_new()
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

   // Xuất file Excel
   XLSX.writeFile(wb, 'data.xlsx')
}

export default exportExcel
