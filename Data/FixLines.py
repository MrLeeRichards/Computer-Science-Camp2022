textFile = open("Sonnets.txt", encoding="utf-8")

newlineFree = ""

for line in textFile.readlines():
    newlineFree += " " + line.strip()

textFile.close()

outFile = open("SonnetsProcessed.txt", "w", encoding="utf-8")
for sentence in newlineFree.split(". "):
    outFile.write(sentence + "\n")

outFile.close()