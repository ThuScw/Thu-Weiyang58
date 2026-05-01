import glob, os, io, sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

pdf_files = glob.glob('reference/*.pdf')
for pdf_path in pdf_files:
    print('\n' + '='*60)
    print('FILE:', os.path.basename(pdf_path))
    print('='*60)
    try:
        import fitz
        doc = fitz.open(pdf_path)
        for i, page in enumerate(doc):
            print(f'--- Page {i+1} ---')
            text = page.get_text()
            if text.strip():
                print(text)
            else:
                print('(image-based page, no text extracted)')
        doc.close()
    except Exception as e:
        print('Error:', e)
