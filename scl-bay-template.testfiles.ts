export const testScl = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4" xmlns:esld="https://dummy.org/SCL/SSD/SLD/v0" xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
	<Header id="A1-M1"/>
	<Substation name="TEMPLATE" esld:w="9" esld:h="12">
		<VoltageLevel name="TEMPLATE" esld:x="1" esld:y="1" esld:lx="1" esld:ly="1" esld:w="7" esld:h="10" nomFreq="50" numPhases="3">
			<Bay name="TEMPLATE" esld:x="2" esld:y="2" esld:lx="2" esld:ly="2" esld:w="5" esld:h="8">
				<Private type="eIEC61850-6-100">
					<eTr_6-100:ProcessResource name="ProtTrip" max="6"/>
					<eTr_6-100:ProcessResource name="CurrentInput" selector="//LNode[@lnClass=&quot;TCTR&quot;]" cardinality="0..n" max="8"/>
				</Private>
				<ConductingEquipment type="CBR" name="QCE1" esld:x="3" esld:y="8" esld:lx="2" esld:ly="9">
					<Terminal name="T2" cNodeName="grounded" substationName="TEMPLATE" voltageLevelName="TEMPLATE" bayName="TEMPLATE" connectivityNode="TEMPLATE/TEMPLATE/TEMPLATE/grounded"/>
					<Terminal esld:uuid="d0ae4741-c3e1-46b1-b133-c85715bd74d2" name="T1" connectivityNode="TEMPLATE/TEMPLATE/TEMPLATE/L4" substationName="TEMPLATE" voltageLevelName="TEMPLATE" bayName="TEMPLATE" cNodeName="L4"/>
					<EqFunction name="ETH">
						<Private type="eIEC61850-6-100">
							<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="SwitchGearPos" max="2"/>
						</Private>
						<LNode iedName="None" lnClass="XSWI" lnInst="1" lnType="XSWI$oscd$_e808e4247c71af33">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="XSWI" sLnInst="1"/>
							</Private>
						</LNode>
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="CSWI$oscd$_f53adbc342dfc7b0">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="CSWI" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QCE1/ETH/XSWI1/Pos.q" input="XSWI1" inputInst="1" service="GOOSE" resourceName="SwitchGearPos"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QCE1/ETH/XSWI1/Pos.stVal" input="XSWI1" inputInst="2" service="GOOSE" resourceName="SwitchGearPos"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</EqFunction>
				</ConductingEquipment>
				<ConductingEquipment type="IFL" name="IFL1" esld:x="5" esld:y="8" esld:lx="5.5" esld:ly="9.5">
					<Terminal esld:uuid="317a2c21-f688-475b-bb46-73e2dea83bb6" name="T1" connectivityNode="TEMPLATE/TEMPLATE/TEMPLATE/L4" substationName="TEMPLATE" voltageLevelName="TEMPLATE" bayName="TEMPLATE" cNodeName="L4"/>
				</ConductingEquipment>
				<ConductingEquipment type="CTR" name="BCT1" esld:x="5" esld:y="6" esld:lx="4" esld:ly="7">
					<Terminal esld:uuid="24b4a5d1-96af-4fb0-bac1-89b9c567cb12" name="T2" connectivityNode="TEMPLATE/TEMPLATE/TEMPLATE/L4" substationName="TEMPLATE" voltageLevelName="TEMPLATE" bayName="TEMPLATE" cNodeName="L4"/>
					<Terminal esld:uuid="99758112-0f67-45ef-9631-afb89d27b788" name="T1" connectivityNode="TEMPLATE/TEMPLATE/TEMPLATE/L3" substationName="TEMPLATE" voltageLevelName="TEMPLATE" bayName="TEMPLATE" cNodeName="L3"/>
					<EqFunction name="CTR">
						<EqSubFunction name="L1">
							<LNode iedName="None" lnClass="TCTR" lnInst="1" lnType="TCTR$oscd$_0f9e473cb1fe415e">
								<Private type="eIEC61850-6-100">
									<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="TCTR" sLnInst="1"/>
								</Private>
							</LNode>
						</EqSubFunction>
						<EqSubFunction name="L2">
							<LNode iedName="None" lnClass="TCTR" lnInst="1" lnType="TCTR$oscd$_0f9e473cb1fe415e">
								<Private type="eIEC61850-6-100">
									<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="TCTR" sLnInst="1"/>
								</Private>
							</LNode>
						</EqSubFunction>
						<EqSubFunction name="L3">
							<LNode iedName="None" lnClass="TCTR" lnInst="1" lnType="TCTR$oscd$_0f9e473cb1fe415e">
								<Private type="eIEC61850-6-100">
									<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="TCTR" sLnInst="1"/>
								</Private>
							</LNode>
						</EqSubFunction>
						<EqSubFunction name="N">
							<LNode iedName="None" lnClass="TCTR" lnInst="1" lnType="TCTR$oscd$_0f9e473cb1fe415e">
								<Private type="eIEC61850-6-100">
									<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="TCTR" sLnInst="1"/>
								</Private>
							</LNode>
						</EqSubFunction>
					</EqFunction>
				</ConductingEquipment>
				<ConductingEquipment type="CBR" name="QA2" esld:x="5" esld:y="4" esld:lx="5.5" esld:ly="5">
					<Terminal esld:uuid="9b3cc2a9-3dbe-4fcf-9bb2-acb91a94f672" name="T2" connectivityNode="TEMPLATE/TEMPLATE/TEMPLATE/L3" substationName="TEMPLATE" voltageLevelName="TEMPLATE" bayName="TEMPLATE" cNodeName="L3"/>
					<Terminal esld:uuid="24bd9d20-3559-4128-97f0-edd6b8afa0c3" name="T1" connectivityNode="TEMPLATE/TEMPLATE/TEMPLATE/L2" substationName="TEMPLATE" voltageLevelName="TEMPLATE" bayName="TEMPLATE" cNodeName="L2"/>
					<EqFunction name="CBR">
						<Private xmlns="http://www.iec.ch/61850/2003/SCL" type="eIEC61850-6-100">
							<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="SwitchGearPos" max="2"/>
							<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="Interlocking" selector="//LNode[@lnClass=&quot;XSWI&quot;]" cardinality="0..n" max="4"/>
							<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="SwitchGearControl" max="4"/>
						</Private>
						<LNode xmlns="http://www.iec.ch/61850/2003/SCL" iedName="None" lnClass="CSWI" lnInst="1" lnType="CSWI$oscd$_62a9bffb9574f30b">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="CSWI" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA2/CBR/XCBR1/Pos.stVal" input="XCBR1" inputInst="1" service="GOOSE" resourceName="SwitchGearPos"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA2/CBR/XCBR1/Pos.q" input="XCBR1" inputInst="2" service="GOOSE" resourceName="SwitchGearPos"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
						<LNode xmlns="http://www.iec.ch/61850/2003/SCL" iedName="None" lnClass="CILO" lnInst="1" lnType="CILO$oscd$_aa7ec79ef27309b1">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="CILO" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="Interlocking" service="GOOSE"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="2" resourceName="Interlocking" service="GOOSE"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="3" resourceName="Interlocking" service="GOOSE"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="4" resourceName="Interlocking" service="GOOSE"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
						<LNode xmlns="http://www.iec.ch/61850/2003/SCL" iedName="None" lnClass="XCBR" lnInst="1" lnType="XCBR$oscd$_420e2f9e111e8bf2">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="XCBR" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA2/CBR/CSWI1/OpCls.general" input="CSWI1" inputInst="1" service="GOOSE" resourceName="SwitchGearControl"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA2/CBR/CSWI1/OpCls.q" input="CSWI1" inputInst="2" service="GOOSE" resourceName="SwitchGearControl"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA2/CBR/CSWI1/OpOpn.general" input="CSWI1" inputInst="3" service="GOOSE" resourceName="SwitchGearControl"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA2/CBR/CSWI1/OpOpn.q" input="CSWI1" inputInst="4" service="GOOSE" resourceName="SwitchGearControl"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/General/PTRC1/Op.general" input="PTRC1" inputInst="5" service="GOOSE" resourceName="ProtTrip"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/General/PTRC1/Op.q" input="PTRC1" inputInst="6" service="GOOSE" resourceName="ProtTrip"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51N/General/PTRC1/Op.general" input="PTRC1" inputInst="7" service="GOOSE" resourceName="ProtTrip"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51N/General/PTRC1/Op.q" input="PTRC1" inputInst="8" service="GOOSE" resourceName="ProtTrip"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/General/PTRC1/Op.general" input="PTRC1" inputInst="9" service="GOOSE" resourceName="ProtTrip"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/General/PTRC1/Op.q" input="PTRC1" inputInst="10" service="GOOSE" resourceName="ProtTrip"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</EqFunction>
				</ConductingEquipment>
				<ConductingEquipment type="CBR" name="QA1" esld:x="3" esld:y="4" esld:lx="2" esld:ly="5">
					<Terminal esld:uuid="f06bd8d8-6969-456e-9ca2-ac912cd87e86" name="T2" connectivityNode="TEMPLATE/TEMPLATE/TEMPLATE/L3" substationName="TEMPLATE" voltageLevelName="TEMPLATE" bayName="TEMPLATE" cNodeName="L3"/>
					<Terminal esld:uuid="1cb5e65f-cc52-4d32-b989-b69102d867ba" name="T1" connectivityNode="TEMPLATE/TEMPLATE/TEMPLATE/L1" substationName="TEMPLATE" voltageLevelName="TEMPLATE" bayName="TEMPLATE" cNodeName="L1"/>
					<EqFunction name="CBR">
						<Private xmlns="http://www.iec.ch/61850/2003/SCL" type="eIEC61850-6-100">
							<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="SwitchGearPos" max="2"/>
							<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="Interlocking" selector="//LNode[@lnClass=&quot;XSWI&quot;]" cardinality="0..n" max="4"/>
							<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="SwitchGearControl" max="4"/>
						</Private>
						<LNode xmlns="http://www.iec.ch/61850/2003/SCL" iedName="None" lnClass="CSWI" lnInst="1" lnType="CSWI$oscd$_62a9bffb9574f30b">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="CSWI" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA1/CBR/XCBR1/Pos.stVal" input="XCBR1" inputInst="1" service="GOOSE" resourceName="SwitchGearPos"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA1/CBR/XCBR1/Pos.q" input="XCBR1" inputInst="2" service="GOOSE" resourceName="SwitchGearPos"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
						<LNode xmlns="http://www.iec.ch/61850/2003/SCL" iedName="None" lnClass="CILO" lnInst="1" lnType="CILO$oscd$_aa7ec79ef27309b1">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="CILO" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="Interlocking" service="GOOSE"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="2" resourceName="Interlocking" service="GOOSE"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="3" resourceName="Interlocking" service="GOOSE"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="4" resourceName="Interlocking" service="GOOSE"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
						<LNode xmlns="http://www.iec.ch/61850/2003/SCL" iedName="None" lnClass="XCBR" lnInst="1" lnType="XCBR$oscd$_420e2f9e111e8bf2">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="XCBR" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA1/CBR/CSWI1/OpCls.general" input="CSWI1" inputInst="1" service="GOOSE" resourceName="SwitchGearControl"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA1/CBR/CSWI1/OpCls.q" input="CSWI1" inputInst="2" service="GOOSE" resourceName="SwitchGearControl"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA1/CBR/CSWI1/OpOpn.general" input="CSWI1" inputInst="3" service="GOOSE" resourceName="SwitchGearControl"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/QA1/CBR/CSWI1/OpOpn.q" input="CSWI1" inputInst="4" service="GOOSE" resourceName="SwitchGearControl"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/General/PTRC1/Op.general" input="PTRC1" inputInst="5" service="GOOSE" resourceName="ProtTrip"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/General/PTRC1/Op.q" input="PTRC1" inputInst="6" service="GOOSE" resourceName="ProtTrip"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51N/General/PTRC1/Op.general" input="PTRC1" inputInst="7" service="GOOSE" resourceName="ProtTrip"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51N/General/PTRC1/Op.q" input="PTRC1" inputInst="8" service="GOOSE" resourceName="ProtTrip"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/General/PTRC1/Op.general" input="PTRC1" inputInst="9" service="GOOSE" resourceName="ProtTrip"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/General/PTRC1/Op.q" input="PTRC1" inputInst="10" service="GOOSE" resourceName="ProtTrip"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</EqFunction>
				</ConductingEquipment>
				<ConductingEquipment type="DIS" name="VS_B" esld:x="5" esld:y="3" esld:lx="5.5" esld:ly="4">
					<Terminal esld:uuid="a807645c-e549-4c9e-8e1d-76c8f8311524" name="T2" connectivityNode="TEMPLATE/TEMPLATE/TEMPLATE/L2" substationName="TEMPLATE" voltageLevelName="TEMPLATE" bayName="TEMPLATE" cNodeName="L2"/>
					<EqFunction name="DIS">
						<Private type="eIEC61850-6-100">
							<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="SwitchGearPos" max="2"/>
						</Private>
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="CSWI$oscd$_f53adbc342dfc7b0">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="CSWI" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/VS_B/DIS/XSWI1/Pos.q" input="XSWI1" inputInst="1" service="GOOSE" resourceName="SwitchGearPos"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/VS_B/DIS/XSWI1/Pos.stVal" input="XSWI1" inputInst="2" service="GOOSE" resourceName="SwitchGearPos"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
						<LNode iedName="None" lnClass="XSWI" lnInst="1" lnType="XSWI$oscd$_44a9e8575e655507">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="XSWI" sLnInst="1"/>
							</Private>
						</LNode>
					</EqFunction>
				</ConductingEquipment>
				<ConductingEquipment type="DIS" name="VS_A" esld:x="3" esld:y="3" esld:lx="2" esld:ly="4">
					<Terminal esld:uuid="0ed46f6e-9c98-4212-9492-3d712d6c7fe2" name="T2" connectivityNode="TEMPLATE/TEMPLATE/TEMPLATE/L1" substationName="TEMPLATE" voltageLevelName="TEMPLATE" bayName="TEMPLATE" cNodeName="L1"/>
					<EqFunction name="DIS">
						<Private type="eIEC61850-6-100">
							<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="SwitchGearPos" max="2"/>
						</Private>
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="CSWI$oscd$_f53adbc342dfc7b0">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="CSWI" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/VS_A/DIS/XSWI1/Pos.q" input="XSWI1" inputInst="1" service="GOOSE" resourceName="SwitchGearPos"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/VS_A/DIS/XSWI1/Pos.stVal" input="XSWI1" inputInst="2" service="GOOSE" resourceName="SwitchGearPos"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
						<LNode iedName="None" lnClass="XSWI" lnInst="1" lnType="XSWI$oscd$_44a9e8575e655507">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="XSWI" sLnInst="1"/>
							</Private>
						</LNode>
					</EqFunction>
				</ConductingEquipment>
				<ConnectivityNode name="grounded" pathName="TEMPLATE/TEMPLATE/TEMPLATE/grounded"/>
				<ConnectivityNode name="L4" pathName="TEMPLATE/TEMPLATE/TEMPLATE/L4">
					<Private type="Dummy-SLD-Vertices">
						<esld:Section>
							<esld:Vertex esld:x="5.5" esld:y="8.16" esld:uuid="317a2c21-f688-475b-bb46-73e2dea83bb6"/>
							<esld:Vertex esld:x="5.5" esld:y="7.5"/>
						</esld:Section>
						<esld:Section>
							<esld:Vertex esld:x="3.5" esld:y="8.16" esld:uuid="d0ae4741-c3e1-46b1-b133-c85715bd74d2"/>
							<esld:Vertex esld:x="3.5" esld:y="7.5"/>
							<esld:Vertex esld:x="5.5" esld:y="7.5"/>
						</esld:Section>
						<esld:Section>
							<esld:Vertex esld:x="5.5" esld:y="7.5"/>
							<esld:Vertex esld:x="5.5" esld:y="6.84" esld:uuid="24b4a5d1-96af-4fb0-bac1-89b9c567cb12"/>
						</esld:Section>
					</Private>
				</ConnectivityNode>
				<ConnectivityNode name="L3" pathName="TEMPLATE/TEMPLATE/TEMPLATE/L3">
					<Private type="Dummy-SLD-Vertices">
						<esld:Section>
							<esld:Vertex esld:x="5.5" esld:y="6.16" esld:uuid="99758112-0f67-45ef-9631-afb89d27b788"/>
							<esld:Vertex esld:x="5.5" esld:y="5.5"/>
						</esld:Section>
						<esld:Section>
							<esld:Vertex esld:x="3.5" esld:y="4.84" esld:uuid="f06bd8d8-6969-456e-9ca2-ac912cd87e86"/>
							<esld:Vertex esld:x="3.5" esld:y="5.5"/>
							<esld:Vertex esld:x="5.5" esld:y="5.5"/>
						</esld:Section>
						<esld:Section>
							<esld:Vertex esld:x="5.5" esld:y="5.5"/>
							<esld:Vertex esld:x="5.5" esld:y="4.84" esld:uuid="9b3cc2a9-3dbe-4fcf-9bb2-acb91a94f672"/>
						</esld:Section>
					</Private>
				</ConnectivityNode>
				<ConnectivityNode name="L2" pathName="TEMPLATE/TEMPLATE/TEMPLATE/L2">
					<Private type="Dummy-SLD-Vertices">
						<esld:Section>
							<esld:Vertex esld:x="5.5" esld:y="3.84" esld:uuid="a807645c-e549-4c9e-8e1d-76c8f8311524"/>
							<esld:Vertex esld:x="5.5" esld:y="4.16" esld:uuid="24bd9d20-3559-4128-97f0-edd6b8afa0c3"/>
						</esld:Section>
					</Private>
				</ConnectivityNode>
				<ConnectivityNode name="L1" pathName="TEMPLATE/TEMPLATE/TEMPLATE/L1">
					<Private type="Dummy-SLD-Vertices">
						<esld:Section>
							<esld:Vertex esld:x="3.5" esld:y="3.84" esld:uuid="0ed46f6e-9c98-4212-9492-3d712d6c7fe2"/>
							<esld:Vertex esld:x="3.5" esld:y="4.16" esld:uuid="1cb5e65f-cc52-4d32-b989-b69102d867ba"/>
						</esld:Section>
					</Private>
				</ConnectivityNode>
				<Function name="P81U">
					<Private type="eIEC61850-6-100">
						<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="VoltageInput" selector="TVTR" cardinality="0..n" max="8"/>
					</Private>
					<SubFunction name="General">
						<LNode iedName="None" lnClass="PTRC" lnInst="1" lnType="PTRC$oscd$_3663d8e0a47849b9">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTRC" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage1/PTUF1/Op.general" input="PTUF1" inputInst="1" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage1/PTUF1/Op.q" input="PTUF1" inputInst="2" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage2/PTUF1/Op.general" input="PTUF1" inputInst="3" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage2/PTUF1/Op.q" input="PTUF1" inputInst="4" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage3/PTUF1/Op.general" input="PTUF1" inputInst="5" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage3/PTUF1/Op.q" input="PTUF1" inputInst="6" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage4/PTUF1/Op.general" input="PTUF1" inputInst="7" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage4/PTUF1/Op.q" input="PTUF1" inputInst="8" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage5/PTUF1/Op.general" input="PTUF1" inputInst="9" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage5/PTUF1/Op.q" input="PTUF1" inputInst="10" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage6/PTUF1/Op.general" input="PTUF1" inputInst="11" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage6/PTUF1/Op.q" input="PTUF1" inputInst="12" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage7/PTUF1/Op.general" input="PTUF1" inputInst="13" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage7/PTUF1/Op.q" input="PTUF1" inputInst="14" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage8/PTUF1/Op.general" input="PTUF1" inputInst="15" service="GOOSE"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P81U/Stage8/PTUF1/Op.q" input="PTUF1" inputInst="16" service="GOOSE"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction name="Stage1">
						<LNode iedName="None" lnClass="PTUF" lnInst="1" lnType="PTUF$oscd$_31c48a55300e392b">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTUF" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="2" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="3" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="4" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="5" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="6" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="7" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="8" resourceName="VoltageInput" service="SMV"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction name="Stage2">
						<LNode iedName="None" lnClass="PTUF" lnInst="1" lnType="PTUF$oscd$_31c48a55300e392b">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTUF" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="2" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="3" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="4" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="5" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="6" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="7" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="8" resourceName="VoltageInput" service="SMV"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction name="Stage3">
						<LNode iedName="None" lnClass="PTUF" lnInst="1" lnType="PTUF$oscd$_31c48a55300e392b">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTUF" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="2" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="3" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="4" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="5" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="6" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="7" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="8" resourceName="VoltageInput" service="SMV"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction name="Stage4">
						<LNode iedName="None" lnClass="PTUF" lnInst="1" lnType="PTUF$oscd$_31c48a55300e392b">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTUF" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="2" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="3" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="4" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="5" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="6" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="7" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="8" resourceName="VoltageInput" service="SMV"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction name="Stage5">
						<LNode iedName="None" lnClass="PTUF" lnInst="1" lnType="PTUF$oscd$_31c48a55300e392b">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTUF" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="2" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="3" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="4" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="5" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="6" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="7" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="8" resourceName="VoltageInput" service="SMV"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction name="Stage6">
						<LNode iedName="None" lnClass="PTUF" lnInst="1" lnType="PTUF$oscd$_31c48a55300e392b">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTUF" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="2" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="3" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="4" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="5" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="6" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="7" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="8" resourceName="VoltageInput" service="SMV"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction name="Stage7">
						<LNode iedName="None" lnClass="PTUF" lnInst="1" lnType="PTUF$oscd$_31c48a55300e392b">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTUF" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="2" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="3" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="4" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="5" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="6" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="7" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="8" resourceName="VoltageInput" service="SMV"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction name="Stage8">
						<LNode iedName="None" lnClass="PTUF" lnInst="1" lnType="PTUF$oscd$_31c48a55300e392b">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTUF" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="2" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="3" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="4" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="5" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="6" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="7" resourceName="VoltageInput" service="SMV"/>
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="8" resourceName="VoltageInput" service="SMV"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
				</Function>
				<Function xmlns="http://www.iec.ch/61850/2003/SCL" name="P51N">
					<SubFunction xmlns="http://www.iec.ch/61850/2003/SCL" name="General">
						<LNode iedName="None" lnClass="PTRC" lnInst="1" lnType="PTRC$oscd$_3663d8e0a47849b9">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTRC" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51N/Stage1/PTOC1/Op.general" input="PTOC1" inputInst="1" service="Internal"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51N/Stage1/PTOC1/Op.q" input="PTOC1" inputInst="2" service="Internal"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51N/Stage2/PTOC1/Op.general" input="PTOC1" inputInst="3" service="Internal"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51N/Stage2/PTOC1/Op.q" input="PTOC1" inputInst="4" service="Internal"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction xmlns="http://www.iec.ch/61850/2003/SCL" name="Stage1">
						<LNode iedName="None" lnClass="PTOC" lnInst="1" lnType="PTOC$oscd$_02fbb098f9687714">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming sIedName="None" sLnClass="PTOC" sLnInst="1"/>
								<eTr_6-100:LNodeInputs>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.instMag.i" input="TCTR1" inputInst="1" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.q" input="TCTR1" inputInst="2" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.instMag.i" input="TCTR1" inputInst="3" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.q" input="TCTR1" inputInst="4" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.instMag.i" input="TCTR1" inputInst="5" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.q" input="TCTR1" inputInst="6" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.instMag.i" input="TCTR1" inputInst="7" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.q" input="TCTR1" inputInst="8" service="SMV" resourceName="CurrentInput"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction xmlns="http://www.iec.ch/61850/2003/SCL" name="Stage2">
						<LNode iedName="None" lnClass="PTOC" lnInst="1" lnType="PTOC$oscd$_02fbb098f9687714">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming sIedName="None" sLnClass="PTOC" sLnInst="1"/>
								<eTr_6-100:LNodeInputs>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.instMag.i" input="TCTR1" inputInst="1" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.q" input="TCTR1" inputInst="2" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.instMag.i" input="TCTR1" inputInst="3" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.q" input="TCTR1" inputInst="4" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.instMag.i" input="TCTR1" inputInst="5" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.q" input="TCTR1" inputInst="6" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.instMag.i" input="TCTR1" inputInst="7" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.q" input="TCTR1" inputInst="8" service="SMV" resourceName="CurrentInput"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
				</Function>
				<Function name="P51">
					<SubFunction xmlns="http://www.iec.ch/61850/2003/SCL" name="General">
						<LNode iedName="None" lnClass="PTRC" lnInst="1" lnType="PTRC$oscd$_3663d8e0a47849b9">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTRC" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/Stage1/PTOC1/Op.general" input="PTOC1" inputInst="1" service="Internal"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/Stage1/PTOC1/Op.q" input="PTOC1" inputInst="2" service="Internal"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/Stage2/PTOC1/Op.general" input="PTOC1" inputInst="3" service="Internal"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/Stage2/PTOC1/Op.q" input="PTOC1" inputInst="4" service="Internal"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/Stage3/PTOC1/Op.general" input="PTOC1" inputInst="5" service="Internal"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/Stage3/PTOC1/Op.q" input="PTOC1" inputInst="6" service="Internal"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/Stage4/PTOC1/Op.general" input="PTOC1" inputInst="7" service="Internal"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/P51/Stage4/PTOC1/Op.q" input="PTOC1" inputInst="8" service="Internal"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction xmlns="http://www.iec.ch/61850/2003/SCL" name="Stage1">
						<LNode iedName="None" lnClass="PTOC" lnInst="1" lnType="PTOC$oscd$_02fbb098f9687714">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTOC" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.instMag.i"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="9" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="10" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="11" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="12" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="13" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="14" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="15" service="SMV" resourceName="CurrentInput"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction xmlns="http://www.iec.ch/61850/2003/SCL" name="Stage2">
						<LNode iedName="None" lnClass="PTOC" lnInst="1" lnType="PTOC$oscd$_02fbb098f9687714">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTOC" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.instMag.i"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="9" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="10" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="11" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="12" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="13" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="14" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="15" service="SMV" resourceName="CurrentInput"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction xmlns="http://www.iec.ch/61850/2003/SCL" name="Stage3">
						<LNode iedName="None" lnClass="PTOC" lnInst="1" lnType="PTOC$oscd$_02fbb098f9687714">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTOC" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.instMag.i"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="9" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="10" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="11" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="12" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="13" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="14" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="15" service="SMV" resourceName="CurrentInput"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
					<SubFunction xmlns="http://www.iec.ch/61850/2003/SCL" name="Stage4">
						<LNode iedName="None" lnClass="PTOC" lnInst="1" lnType="PTOC$oscd$_7cd50c6018e7d4a6">
							<Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="PTOC" sLnInst="1"/>
								<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
									<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.instMag.i"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="9" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="10" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="11" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="12" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="13" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.instMag.i" input="resourceRefInput" inputInst="14" service="SMV" resourceName="CurrentInput"/>
									<eTr_6-100:SourceRef source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.q" input="resourceRefInput" inputInst="15" service="SMV" resourceName="CurrentInput"/>
								</eTr_6-100:LNodeInputs>
							</Private>
						</LNode>
					</SubFunction>
				</Function>
				<Function xmlns="http://www.iec.ch/61850/2003/SCL" name="Meas">
					<Private type="eIEC61850-6-100">
						<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="CurrentInput" selector="TCTR" cardinality="0..n" max="8"/>
						<eTr_6-100:ProcessResource xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" name="VoltageInput" selector="TVTR" cardinality="0..n" max="8"/>
					</Private>
					<LNode iedName="None" lnClass="MMXU" lnInst="1" lnType="MMXU$oscd$_431ca23955b46f2a">
						<Private type="eIEC61850-6-100">
							<eTr_6-100:LNodeSpecNaming xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" sIedName="None" sLnClass="MMXU" sLnInst="1"/>
							<eTr_6-100:LNodeInputs xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100">
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="1" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.instMag.i"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="2" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L1/TCTR1/AmpSv.q"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="3" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.instMag.i"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="4" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L2/TCTR1/AmpSv.q"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="5" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.instMag.i"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="6" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/L3/TCTR1/AmpSv.q"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="7" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.instMag.i"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="8" resourceName="CurrentInput" service="SMV" source="TEMPLATE/TEMPLATE/TEMPLATE/BCT1/CTR/N/TCTR1/AmpSv.q"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="9" resourceName="VoltageInput" service="SMV"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="10" resourceName="VoltageInput" service="SMV"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="11" resourceName="VoltageInput" service="SMV"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="12" resourceName="VoltageInput" service="SMV"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="13" resourceName="VoltageInput" service="SMV"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="14" resourceName="VoltageInput" service="SMV"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="15" resourceName="VoltageInput" service="SMV"/>
								<eTr_6-100:SourceRef input="resourceRefInput" inputInst="16" resourceName="VoltageInput" service="SMV"/>
							</eTr_6-100:LNodeInputs>
						</Private>
					</LNode>
				</Function>
			</Bay>
		</VoltageLevel>
	</Substation>
	<DataTypeTemplates>
		<LNodeType lnClass="PTUF" id="PTUF$oscd$_31c48a55300e392b">
			<DO name="Beh" type="Beh$oscd$_c6ed035c8137b35a"/>
			<DO name="Op" type="Op$oscd$_8598a343000a4c8c" transient="true"/>
			<DO name="Str" type="Str$oscd$_ba49448ecb46113a"/>
			<DO name="StrVal" type="StrVal$oscd$_70f83e1c005744f2"/>
			<DO name="OpDlTmms" type="OpDlTmms$oscd$_f1c0d370e7430e0c"/>
		</LNodeType>
		<LNodeType lnClass="XSWI" id="XSWI$oscd$_e808e4247c71af33" desc="EarthSwitch">
			<DO name="Beh" type="Beh$oscd$_c6ed035c8137b35a"/>
			<DO name="BlkCls" type="BlkCls$oscd$_637b3bee56ce66e4"/>
			<DO name="BlkOpn" type="BlkOpn$oscd$_637b3bee56ce66e4"/>
			<DO name="Loc" type="Loc$oscd$_d915d66d9e42a575"/>
			<DO name="OpCnt" type="OpCnt$oscd$_bbaa9369107884bc"/>
			<DO name="Pos" type="Pos$oscd$_a672a31af87c3923"/>
			<DO name="SwTyp" type="SwTyp$oscd$_24af7e683870f1ba"/>
		</LNodeType>
		<LNodeType lnClass="XSWI" id="XSWI$oscd$_44a9e8575e655507" desc="Disconnector">
			<DO name="Beh" type="Beh$oscd$_c6ed035c8137b35a"/>
			<DO name="BlkCls" type="BlkCls$oscd$_637b3bee56ce66e4"/>
			<DO name="BlkOpn" type="BlkOpn$oscd$_637b3bee56ce66e4"/>
			<DO name="Loc" type="Loc$oscd$_d915d66d9e42a575"/>
			<DO name="OpCnt" type="OpCnt$oscd$_bbaa9369107884bc"/>
			<DO name="Pos" type="Pos$oscd$_a672a31af87c3923"/>
			<DO name="SwTyp" type="SwTyp$oscd$_febe33b013272c11"/>
		</LNodeType>
		<LNodeType lnClass="CSWI" id="CSWI$oscd$_f53adbc342dfc7b0" desc="StatusOnly">
			<DO name="Beh" type="Beh$oscd$_c6ed035c8137b35a"/>
			<DO name="Pos" type="Pos$oscd$_a672a31af87c3923"/>
			<DO name="OpCls" type="OpCls$oscd$_8598a343000a4c8c" transient="true"/>
			<DO name="OpOpn" type="OpOpn$oscd$_8598a343000a4c8c" transient="true"/>
		</LNodeType>
		<LNodeType lnClass="TCTR" id="TCTR$oscd$_0f9e473cb1fe415e">
			<DO name="ARtg" type="ARtg$oscd$_70f83e1c005744f2"/>
			<DO name="Beh" type="Beh$oscd$_e474e322aec2d308"/>
			<DO name="HzRtg" type="HzRtg$oscd$_70f83e1c005744f2"/>
			<DO name="AmpSv" type="AmpSv$oscd$_75cba5ebd45ece23"/>
		</LNodeType>
		<LNodeType lnClass="XCBR" id="XCBR$oscd$_420e2f9e111e8bf2">
			<DO name="Beh" type="Beh$oscd$_c6ed035c8137b35a"/>
			<DO name="BlkCls" type="BlkCls$oscd$_637b3bee56ce66e4"/>
			<DO name="BlkOpn" type="BlkOpn$oscd$_637b3bee56ce66e4"/>
			<DO name="Loc" type="Loc$oscd$_d915d66d9e42a575"/>
			<DO name="OpCnt" type="OpCnt$oscd$_bbaa9369107884bc"/>
			<DO name="Pos" type="Pos$oscd$_a672a31af87c3923"/>
		</LNodeType>
		<LNodeType lnClass="CILO" id="CILO$oscd$_aa7ec79ef27309b1">
			<DO name="Beh" type="Beh$oscd$_c6ed035c8137b35a"/>
			<DO name="EnaCls" type="EnaCls$oscd$_d915d66d9e42a575"/>
			<DO name="EnaOpn" type="EnaOpn$oscd$_d915d66d9e42a575"/>
		</LNodeType>
		<LNodeType lnClass="CSWI" id="CSWI$oscd$_62a9bffb9574f30b">
			<DO name="Beh" type="Beh$oscd$_c6ed035c8137b35a"/>
			<DO name="Pos" type="Pos$oscd$_d6386b0989a52876"/>
			<DO name="OpCls" type="OpCls$oscd$_8598a343000a4c8c" transient="true"/>
			<DO name="OpOpn" type="OpOpn$oscd$_8598a343000a4c8c" transient="true"/>
		</LNodeType>
		<LNodeType lnClass="PTOC" id="PTOC$oscd$_7cd50c6018e7d4a6" desc="Inverse">
			<DO name="Beh" type="Beh$oscd$_c6ed035c8137b35a"/>
			<DO name="Op" type="Op$oscd$_8598a343000a4c8c" transient="true"/>
			<DO name="Str" type="Str$oscd$_ba49448ecb46113a"/>
			<DO name="StrVal" type="StrVal$oscd$_70f83e1c005744f2"/>
			<DO name="TmMult" type="TmMult$oscd$_70f83e1c005744f2"/>
			<DO name="TmACrv" type="TmACrv$oscd$_877ad410ce02c538"/>
		</LNodeType>
		<LNodeType lnClass="PTOC" id="PTOC$oscd$_02fbb098f9687714" desc="Definite">
			<DO name="Beh" type="Beh$oscd$_c6ed035c8137b35a"/>
			<DO name="Op" type="Op$oscd$_8598a343000a4c8c" transient="true"/>
			<DO name="Str" type="Str$oscd$_ba49448ecb46113a"/>
			<DO name="StrVal" type="StrVal$oscd$_70f83e1c005744f2"/>
			<DO name="OpDlTmms" type="OpDlTmms$oscd$_f1c0d370e7430e0c"/>
		</LNodeType>
		<LNodeType lnClass="PTRC" id="PTRC$oscd$_3663d8e0a47849b9">
			<DO name="Beh" type="Beh$oscd$_c6ed035c8137b35a"/>
			<DO name="Op" type="Op$oscd$_8598a343000a4c8c" transient="true"/>
			<DO name="Str" type="Str$oscd$_ba49448ecb46113a"/>
		</LNodeType>
		<LNodeType lnClass="MMXU" id="MMXU$oscd$_431ca23955b46f2a">
			<DO name="Beh" type="Beh$oscd$_c6ed035c8137b35a"/>
			<DO name="A" type="A$oscd$_adb498fee2e4d746"/>
			<DO name="PhV" type="PhV$oscd$_adb498fee2e4d746"/>
			<DO name="TotW" type="TotW$oscd$_6416cc1c8c77be03"/>
			<DO name="TotVAr" type="TotVAr$oscd$_6416cc1c8c77be03"/>
			<DO name="TotVA" type="TotVA$oscd$_6416cc1c8c77be03"/>
		</LNodeType>
		<DOType cdc="ENS" id="SwTyp$oscd$_24af7e683870f1ba">
			<DA name="stVal" fc="ST" dchg="true" dupd="true" bType="Enum" type="stVal$oscd$_a873e164e468f685"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="ENS" id="SwTyp$oscd$_febe33b013272c11">
			<DA name="stVal" fc="ST" dchg="true" dupd="true" bType="Enum" type="stVal$oscd$_5fd8676abc4e2798"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="ASG" id="ARtg$oscd$_70f83e1c005744f2">
			<DA name="setMag" fc="SE" bType="Struct" type="setMag$oscd$_ed49c2f7a55ad05a"/>
		</DOType>
		<DOType cdc="ENS" id="Beh$oscd$_e474e322aec2d308">
			<DA name="stVal" fc="ST" dchg="true" dupd="true" bType="Enum" type="stVal$oscd$_96f523f4e0f793f7"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="ASG" id="HzRtg$oscd$_70f83e1c005744f2">
			<DA name="setMag" fc="SE" bType="Struct" type="setMag$oscd$_ed49c2f7a55ad05a"/>
		</DOType>
		<DOType cdc="SAV" id="AmpSv$oscd$_75cba5ebd45ece23">
			<DA name="instMag" fc="MX" bType="Struct" type="instMag$oscd$_5a5af9e249dc7f84"/>
			<DA name="q" fc="MX" qchg="true" bType="Quality"/>
			<DA name="sVC" fc="CF" dchg="true" bType="Struct" type="sVC$oscd$_df6488ea078bf55c"/>
		</DOType>
		<DOType cdc="SPC" id="BlkCls$oscd$_637b3bee56ce66e4">
			<DA name="ctlModel" fc="CF" dchg="true" bType="Enum" type="ctlModel$oscd$_f80264355419aeff"/>
		</DOType>
		<DOType cdc="SPC" id="BlkOpn$oscd$_637b3bee56ce66e4">
			<DA name="ctlModel" fc="CF" dchg="true" bType="Enum" type="ctlModel$oscd$_f80264355419aeff"/>
		</DOType>
		<DOType cdc="SPS" id="Loc$oscd$_d915d66d9e42a575">
			<DA name="stVal" fc="ST" dchg="true" bType="BOOLEAN"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="INS" id="OpCnt$oscd$_bbaa9369107884bc">
			<DA name="stVal" fc="ST" dchg="true" dupd="true" bType="INT32"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="DPC" id="Pos$oscd$_a672a31af87c3923">
			<DA name="stVal" fc="ST" dchg="true" bType="Dbpos"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
			<DA name="ctlModel" fc="CF" dchg="true" bType="Enum" type="ctlModel$oscd$_f80264355419aeff"/>
		</DOType>
		<DOType cdc="SPS" id="EnaCls$oscd$_d915d66d9e42a575">
			<DA name="stVal" fc="ST" dchg="true" bType="BOOLEAN"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="SPS" id="EnaOpn$oscd$_d915d66d9e42a575">
			<DA name="stVal" fc="ST" dchg="true" bType="BOOLEAN"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="DPC" id="Pos$oscd$_d6386b0989a52876">
			<DA name="stVal" fc="ST" dchg="true" bType="Dbpos"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
			<DA name="ctlModel" fc="CF" dchg="true" bType="Enum" type="ctlModel$oscd$_f80264355419aeff"/>
			<DA name="sboTimeout" fc="CF" dchg="true" bType="INT32U"/>
			<DA name="operTimeout" fc="CF" dchg="true" bType="INT32U"/>
			<DA name="SBOw" fc="CO" bType="Struct" type="SBOw$oscd$_0d1ece84b67fe837"/>
			<DA name="Oper" fc="CO" bType="Struct" type="Oper$oscd$_0d1ece84b67fe837"/>
			<DA name="Cancel" fc="CO" bType="Struct" type="Cancel$oscd$_23b00f788591fc22"/>
		</DOType>
		<DOType cdc="ACT" id="OpCls$oscd$_8598a343000a4c8c">
			<DA name="general" fc="ST" dchg="true" bType="BOOLEAN"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="ACT" id="OpOpn$oscd$_8598a343000a4c8c">
			<DA name="general" fc="ST" dchg="true" bType="BOOLEAN"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="ASG" id="TmMult$oscd$_70f83e1c005744f2">
			<DA name="setMag" fc="SE" bType="Struct" type="setMag$oscd$_ed49c2f7a55ad05a"/>
		</DOType>
		<DOType cdc="CURVE" id="TmACrv$oscd$_877ad410ce02c538">
			<DA name="setCharact" fc="SE" bType="Enum" type="setCharact$oscd$_91383737343cb725"/>
		</DOType>
		<DOType cdc="ASG" id="StrVal$oscd$_70f83e1c005744f2">
			<DA name="setMag" fc="SE" bType="Struct" type="setMag$oscd$_ed49c2f7a55ad05a"/>
		</DOType>
		<DOType cdc="ING" id="OpDlTmms$oscd$_f1c0d370e7430e0c">
			<DA name="setVal" fc="SE" bType="INT32"/>
		</DOType>
		<DOType cdc="ACT" id="Op$oscd$_8598a343000a4c8c">
			<DA name="general" fc="ST" dchg="true" bType="BOOLEAN"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="ACD" id="Str$oscd$_ba49448ecb46113a">
			<DA name="general" fc="ST" dchg="true" bType="BOOLEAN"/>
			<DA name="dirGeneral" fc="ST" dchg="true" bType="Enum" type="dirGeneral$oscd$_ba7b8abb9d154a3c"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="ENS" id="Beh$oscd$_c6ed035c8137b35a">
			<DA name="stVal" fc="ST" dchg="true" dupd="true" bType="Enum" type="stVal$oscd$_48ba16345b8e7f5b"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DOType cdc="WYE" id="A$oscd$_adb498fee2e4d746">
			<SDO name="phsC" type="phsC$oscd$_456495847f2df6e8"/>
			<SDO name="phsB" type="phsB$oscd$_456495847f2df6e8"/>
			<SDO name="phsA" type="phsA$oscd$_456495847f2df6e8"/>
		</DOType>
		<DOType cdc="WYE" id="PhV$oscd$_adb498fee2e4d746">
			<SDO name="phsC" type="phsC$oscd$_456495847f2df6e8"/>
			<SDO name="phsB" type="phsB$oscd$_456495847f2df6e8"/>
			<SDO name="phsA" type="phsA$oscd$_456495847f2df6e8"/>
		</DOType>
		<DOType cdc="MV" id="TotW$oscd$_6416cc1c8c77be03">
			<DA name="mag" fc="MX" dchg="true" dupd="true" bType="Struct" type="mag$oscd$_ed49c2f7a55ad05a"/>
			<DA name="q" fc="MX" qchg="true" bType="Quality"/>
			<DA name="t" fc="MX" bType="Timestamp"/>
			<DA name="db" fc="CF" dchg="true" bType="INT32U"/>
		</DOType>
		<DOType cdc="MV" id="TotVAr$oscd$_6416cc1c8c77be03">
			<DA name="mag" fc="MX" dchg="true" dupd="true" bType="Struct" type="mag$oscd$_ed49c2f7a55ad05a"/>
			<DA name="q" fc="MX" qchg="true" bType="Quality"/>
			<DA name="t" fc="MX" bType="Timestamp"/>
			<DA name="db" fc="CF" dchg="true" bType="INT32U"/>
		</DOType>
		<DOType cdc="MV" id="TotVA$oscd$_6416cc1c8c77be03">
			<DA name="mag" fc="MX" dchg="true" dupd="true" bType="Struct" type="mag$oscd$_ed49c2f7a55ad05a"/>
			<DA name="q" fc="MX" qchg="true" bType="Quality"/>
			<DA name="t" fc="MX" bType="Timestamp"/>
			<DA name="db" fc="CF" dchg="true" bType="INT32U"/>
		</DOType>
		<DOType cdc="CMV" id="phsC$oscd$_456495847f2df6e8">
			<DA name="instCVal" fc="MX" bType="Struct" type="instCVal$oscd$_21f679e08734a896"/>
			<DA name="cVal" fc="MX" dchg="true" dupd="true" bType="Struct" type="cVal$oscd$_80272042468595d1"/>
			<DA name="q" fc="MX" qchg="true" bType="Quality"/>
			<DA name="t" fc="MX" bType="Timestamp"/>
			<DA name="db" fc="CF" dchg="true" bType="INT32U"/>
		</DOType>
		<DOType cdc="CMV" id="phsB$oscd$_456495847f2df6e8">
			<DA name="instCVal" fc="MX" bType="Struct" type="instCVal$oscd$_21f679e08734a896"/>
			<DA name="cVal" fc="MX" dchg="true" dupd="true" bType="Struct" type="cVal$oscd$_80272042468595d1"/>
			<DA name="q" fc="MX" qchg="true" bType="Quality"/>
			<DA name="t" fc="MX" bType="Timestamp"/>
			<DA name="db" fc="CF" dchg="true" bType="INT32U"/>
		</DOType>
		<DOType cdc="CMV" id="phsA$oscd$_456495847f2df6e8">
			<DA name="instCVal" fc="MX" bType="Struct" type="instCVal$oscd$_21f679e08734a896"/>
			<DA name="cVal" fc="MX" dchg="true" dupd="true" bType="Struct" type="cVal$oscd$_80272042468595d1"/>
			<DA name="q" fc="MX" qchg="true" bType="Quality"/>
			<DA name="t" fc="MX" bType="Timestamp"/>
			<DA name="db" fc="CF" dchg="true" bType="INT32U"/>
		</DOType>
		<DAType id="instMag$oscd$_5a5af9e249dc7f84">
			<BDA name="i" bType="INT32"/>
		</DAType>
		<DAType id="sVC$oscd$_df6488ea078bf55c">
			<BDA name="scaleFactor" bType="FLOAT32"/>
			<BDA name="offset" bType="FLOAT32"/>
		</DAType>
		<DAType id="SBOw$oscd$_0d1ece84b67fe837">
			<BDA name="ctlVal" bType="BOOLEAN"/>
			<BDA name="origin" bType="Struct" type="origin$oscd$_cfc683368475eafc"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" bType="Check"/>
		</DAType>
		<DAType id="Oper$oscd$_0d1ece84b67fe837">
			<BDA name="ctlVal" bType="BOOLEAN"/>
			<BDA name="origin" bType="Struct" type="origin$oscd$_cfc683368475eafc"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" bType="Check"/>
		</DAType>
		<DAType id="Cancel$oscd$_23b00f788591fc22">
			<BDA name="ctlVal" bType="BOOLEAN"/>
			<BDA name="origin" bType="Struct" type="origin$oscd$_cfc683368475eafc"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
		</DAType>
		<DAType id="origin$oscd$_cfc683368475eafc">
			<BDA name="orCat" bType="Enum" type="orCat$oscd$_711cd9acd4dad897"/>
			<BDA name="orIdent" bType="Octet64"/>
		</DAType>
		<DAType id="setMag$oscd$_ed49c2f7a55ad05a">
			<BDA name="f" bType="FLOAT32"/>
		</DAType>
		<DAType id="mag$oscd$_ed49c2f7a55ad05a">
			<BDA name="f" bType="FLOAT32"/>
		</DAType>
		<DAType id="instCVal$oscd$_21f679e08734a896">
			<BDA name="mag" bType="Struct" type="mag$oscd$_ed49c2f7a55ad05a"/>
			<BDA name="ang" bType="Struct" type="ang$oscd$_ed49c2f7a55ad05a"/>
		</DAType>
		<DAType id="cVal$oscd$_80272042468595d1">
			<BDA name="mag" bType="Struct" type="mag$oscd$_ed49c2f7a55ad05a"/>
		</DAType>
		<DAType id="ang$oscd$_ed49c2f7a55ad05a">
			<BDA name="f" bType="FLOAT32"/>
		</DAType>
		<EnumType id="stVal$oscd$_a873e164e468f685">
			<EnumVal ord="3">Earthing Switch</EnumVal>
		</EnumType>
		<EnumType id="stVal$oscd$_5fd8676abc4e2798">
			<EnumVal ord="2">Disconnector</EnumVal>
		</EnumType>
		<EnumType id="stVal$oscd$_96f523f4e0f793f7">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="2">blocked</EnumVal>
			<EnumVal ord="3">test</EnumVal>
			<EnumVal ord="5">off</EnumVal>
		</EnumType>
		<EnumType id="ctlModel$oscd$_f80264355419aeff">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="2">sbo-with-normal-security</EnumVal>
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="orCat$oscd$_711cd9acd4dad897">
			<EnumVal ord="0">not-supported</EnumVal>
			<EnumVal ord="1">bay-control</EnumVal>
			<EnumVal ord="2">station-control</EnumVal>
			<EnumVal ord="3">remote-control</EnumVal>
			<EnumVal ord="4">automatic-bay</EnumVal>
			<EnumVal ord="5">automatic-station</EnumVal>
			<EnumVal ord="6">automatic-remote</EnumVal>
			<EnumVal ord="7">maintenance</EnumVal>
			<EnumVal ord="8">process</EnumVal>
		</EnumType>
		<EnumType id="setCharact$oscd$_91383737343cb725">
			<EnumVal ord="0">None</EnumVal>
			<EnumVal ord="1">ANSI Extremely Inverse</EnumVal>
			<EnumVal ord="2">ANSI Very Inverse</EnumVal>
			<EnumVal ord="3">ANSI Normal Inverse</EnumVal>
			<EnumVal ord="4">ANSI Moderate Inverse</EnumVal>
			<EnumVal ord="5">ANSI Definite Time</EnumVal>
			<EnumVal ord="6">Long-Time Extremely Inverse</EnumVal>
			<EnumVal ord="7">Long-Time Very Inverse</EnumVal>
			<EnumVal ord="8">Long-Time Inverse</EnumVal>
			<EnumVal ord="9">IEC Normal Inverse</EnumVal>
			<EnumVal ord="10">IEC Very Inverse</EnumVal>
			<EnumVal ord="11">IEC Inverse</EnumVal>
			<EnumVal ord="12">IEC Extremely Inverse</EnumVal>
			<EnumVal ord="13">IEC Short-Time Inverse</EnumVal>
			<EnumVal ord="14">IEC Long-Time Inverse</EnumVal>
			<EnumVal ord="15">IEC Definite Time</EnumVal>
			<EnumVal ord="16">Reserved</EnumVal>
			<EnumVal ord="17">Polynom 1</EnumVal>
			<EnumVal ord="18">Polynom 2</EnumVal>
			<EnumVal ord="19">Polynom 3</EnumVal>
			<EnumVal ord="20">Polynom 4</EnumVal>
			<EnumVal ord="21">Polynom 5</EnumVal>
			<EnumVal ord="22">Polynom 6</EnumVal>
			<EnumVal ord="23">Polynom 7</EnumVal>
			<EnumVal ord="24">Polynom 8</EnumVal>
			<EnumVal ord="25">Polynom 9</EnumVal>
			<EnumVal ord="26">Polynom 10</EnumVal>
			<EnumVal ord="27">Polynom 11</EnumVal>
			<EnumVal ord="28">Polynom 12</EnumVal>
			<EnumVal ord="29">Polynom 13</EnumVal>
			<EnumVal ord="30">Polynom 14</EnumVal>
			<EnumVal ord="31">Polynom 15</EnumVal>
			<EnumVal ord="32">Polynom 16</EnumVal>
			<EnumVal ord="33">Multiline 1</EnumVal>
			<EnumVal ord="34">Multiline 2</EnumVal>
			<EnumVal ord="35">Multiline 3</EnumVal>
			<EnumVal ord="36">Multiline 4</EnumVal>
			<EnumVal ord="37">Multiline 5</EnumVal>
			<EnumVal ord="38">Multiline 6</EnumVal>
			<EnumVal ord="39">Multiline 7</EnumVal>
			<EnumVal ord="40">Multiline 8</EnumVal>
			<EnumVal ord="41">Multiline 9</EnumVal>
			<EnumVal ord="42">Multiline 10</EnumVal>
			<EnumVal ord="43">Multiline 11</EnumVal>
			<EnumVal ord="44">Multiline 12</EnumVal>
			<EnumVal ord="45">Multiline 13</EnumVal>
			<EnumVal ord="46">Multiline 14</EnumVal>
			<EnumVal ord="47">Multiline 15</EnumVal>
			<EnumVal ord="48">Multiline 16</EnumVal>
		</EnumType>
		<EnumType id="dirGeneral$oscd$_ba7b8abb9d154a3c">
			<EnumVal ord="0">unknown</EnumVal>
			<EnumVal ord="1">forward</EnumVal>
			<EnumVal ord="2">backward</EnumVal>
			<EnumVal ord="3">both</EnumVal>
		</EnumType>
		<EnumType id="stVal$oscd$_48ba16345b8e7f5b">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="2">blocked</EnumVal>
			<EnumVal ord="3">test</EnumVal>
			<EnumVal ord="4">test/blocked</EnumVal>
			<EnumVal ord="5">off</EnumVal>
		</EnumType>
	</DataTypeTemplates>
</SCL>`;
