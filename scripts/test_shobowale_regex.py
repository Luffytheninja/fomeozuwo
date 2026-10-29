import fitz
import re

doc = fitz.open('public/Johnson Shobowal International Gallery Catalogue.pdf')
for p in range(len(doc)):
    txt = doc[p].get_text('text')
    if 'ILLUSTRATED ARTWORK ENTRY' in txt and 'JBS-' in txt:
        m = re.search(r'(JBS-\d+)\s*\n\s*(.*?)\s*\((\d{4})\)', txt)
        if m:
            cat_id = m.group(1).strip()
            title = m.group(2).strip()
            yr = m.group(3).strip()
            
            # Find medium and dimensions
            # Usually after title, contains '|' and 'inches'
            m_med = re.search(r'([A-Za-z0-9\s\:\,\.\-]+?\|\s*[\d\s\.\,\×\x78\-]+(?:inches|in))', txt.replace('\n', ' '))
            med_dim = m_med.group(1).strip() if m_med else "Unknown"
            
            # Extract story
            # Starts after dimensions, ends before "JOHNSON BABATUNDE" or "PROVENANCE"
            clean_txt = txt.replace('\uf001', 'fi').replace('\uf002', 'fl')
            # remove headers/footers
            body = re.sub(r'^(?:.*?ILLUSTRATED ARTWORK ENTRY.*?)\n', '', clean_txt, flags=re.DOTALL)
            
            print(f"{cat_id} ({yr}) | {title} | {med_dim}")
