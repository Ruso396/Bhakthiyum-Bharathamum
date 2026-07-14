import * as XLSX from 'xlsx';

interface ExportColumn {
  header: string;
  key: string;
}

interface ExportData {
  columns: ExportColumn[];
  rows: Record<string, any>[];
  filename?: string;
}

export const exportToExcel = ({ columns, rows, filename }: ExportData) => {
  const headerRow = columns.map((col) => col.header);
  const dataRows = rows.map((row) =>
    columns.map((col) => row[col.key] ?? '')
  );

  const wsData = [headerRow, ...dataRows];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Column widths (auto-fit based on header/content length)
  const colWidths = columns.map((col, idx) => {
    const headerLen = col.header.length;
    const maxDataLen = dataRows.reduce((max, row) => {
      const val = String(row[idx] ?? '');
      return Math.max(max, val.length);
    }, 0);
    return { wch: Math.max(headerLen, maxDataLen) + 4 };
  });
  ws['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filename || 'export.xlsx');
};