import json
import sys

def summarize():
    out_lines = []
    def log(s=""):
        out_lines.append(str(s))

    with open('scripts/shobowale_details.json', 'r', encoding='utf-8') as f:
        shob = json.load(f)
    log("=== SHOBOWALE PAGES 1-5 ===")
    for p in range(1, 6):
        log(f"\n--- Page {p} ---")
        log(shob['intro_pages'].get(str(p), ''))
        
    log("\n=== SHOBOWALE ARTWORK ENTRIES ===")
    for item in shob['artworks']:
        if len(item['images']) > 0 and len(item['text']) > 50:
            lines = [l.strip() for l in item['text'].split('\n') if l.strip()]
            log(f"P.{item['page']}: {lines[:6]}")

    with open('scripts/akinwolere_details.json', 'r', encoding='utf-8') as f:
        akin = json.load(f)
    log("\n=== AKINWOLERE PAGES 1-5 ===")
    for p in range(1, 6):
        log(f"\n--- Page {p} ---")
        log(akin['intro_pages'].get(str(p), ''))
        
    log("\n=== AKINWOLERE ARTWORK ENTRIES ===")
    for item in akin['artworks']:
        if len(item['images']) > 0 and len(item['text']) > 50:
            lines = [l.strip() for l in item['text'].split('\n') if l.strip()]
            log(f"P.{item['page']}: {lines[:6]}")

    with open('scripts/summary_clean.txt', 'w', encoding='utf-8') as f:
        f.write("\n".join(out_lines))
    print("Wrote scripts/summary_clean.txt")

if __name__ == '__main__':
    summarize()
