import json

namesFile = open("namesCombined.txt")

model = []

for name in namesFile.readlines():
    processedName = "$" + name.strip("\n") + "^"
    maxGapSize = len(processedName) - 2

    if len(model) < maxGapSize:
        model += [{}] * (maxGapSize - len(model))

    for gap in range(maxGapSize):
        for i in range(len(processedName) - gap - 1):
            if processedName[i] + processedName[i + gap + 1] in model[gap].keys():
                model[gap][processedName[i] + processedName[i + gap + 1]] += 1
            else:
                model[gap][processedName[i] + processedName[i + gap + 1]] = 1

print("let model = " + json.dumps(model) + ";")