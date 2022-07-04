import json

def processFile(file):
    for line in textFile.readlines():
        words = line.split()

        if len(words) > 3:
            words = ["$", "$"] + words + ["^"]

            for pairIndex in range(len(words) - 2):
                pair = words[pairIndex] + " " + words[pairIndex + 1]
                nextWord = words[pairIndex + 2]

                if pair not in model.keys():
                    model[pair] = { "words": [], "counts": [] }
                    model[pair]["words"].append(nextWord)
                    model[pair]["counts"].append(1)
                elif nextWord in model[pair]["words"]:
                    model[pair]["counts"][model[pair]["words"].index(nextWord)] += 1
                else:
                    model[pair]["words"].append(nextWord)
                    model[pair]["counts"].append(1)

model = {}

textFile = open("ChristmasCarolProcessed.txt", encoding="utf-8")
processFile(textFile)
textFile.close()

textFile = open("TheCakeAndBiscuitBookProcessed.txt", encoding="utf-8")
processFile(textFile)
textFile.close()

print("let model = " + json.dumps(model) + ";")

