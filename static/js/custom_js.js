function downloadExcel() {
    const data = [
        ['col1','col2', 'col3'],
        [1,2, 'a'],
        [3,4, 'b']
    ]
    // Create a new Excel workbook
    const workbook = XLSX.utils.book_new();
    // Convert data to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    // Add worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    // Generate Excel file as a Blob
    const excelBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // Create and click download link.
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([excelBlob], { type: 'application/octet-stream' }));
    a.download = 'file.xlsx';
    a.click();
    // remove the element
    a.remove();
}

function downloadCSV() {
    const data = "Name,Age,Location\nJohn,25,New York\nJane,30,San Francisco\nAlex,22,Los Angeles";
    const blob = new Blob([data], {type: 'text/csv'});
    const fileName = 'data.csv';
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}