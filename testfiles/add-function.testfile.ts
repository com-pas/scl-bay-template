export const addFunctionTestfile = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4" xmlns:esld="https://dummy.org/SCL/SSD/SLD/v0" xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
    <Substation name="sub1">
        <VoltageLevel name="vl1" nomFreq="50" numPhases="3">
            <Bay name="bay1">
                <ConductingEquipment type="CBR" name="CE1">
                </ConductingEquipment>
            </Bay>
            <PowerTransformer name="PT1">
            </PowerTransformer>
        </VoltageLevel>
    </Substation>
</SCL>
`;
