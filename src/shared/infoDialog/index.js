import styled from 'styled-components'
import { useSelector, dataStore } from '@app/store'
import { DrawOutBtn } from '@app/pages/commodity'
import { useState, useEffect, lazy, Suspense, Fragment } from 'react'
import { INFO_DIALOG_TYPE } from '@app/utils/constants'
import { Checkbox, Input } from 'antd'
import privacyPolicyWording from './privacyPolicy.json'
import topUpWording from './topUp.json'
import drawProbability from './drawProbability.json'

const Mask = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: ${p => p.theme.color.mask};
	border-radius: ${p => p.theme.borderRadius.content};
	z-index: ${p => p.theme.zIndex.mask};
`

const Container = styled.div`
	position: absolute;
	color: #000;
	opacity: 1;
	top: 20px;
	width: 60%;
	left: 20%;
	max-height: calc(90% - 20px);
	z-index: ${p => p.theme.zIndex.dialog};
	display: flex;
	min-height: 250px;
	flex-direction: column;
	background: ${p => p.theme.color.background};
	border: 1px solid ${p => p.theme.color.dialogBorder};
	border-radius: ${p => p.theme.borderRadius.dialogContainer};
	padding: 20px 40px 60px;
	display: flex;
	@media (max-width: 768px) {
		width: 90%;
		left: 5%;
	}
`

const Block = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
`

const Header = styled(Block)`
	position: relative;
	top: 0;
	h3 {
		margin: 0;
	}
`

export const P = styled.p`
	display: flex;
	align-items: center;
	margin: 5px 0;
	justify-content: ${p => (p.center ? 'center' : 'unset')};
	opacity: ${p => p.opacity || 1};
	input {
		width: 80%;
	}
`

const Footer = styled(Block)`
	position: absolute;
	bottom: 0;
	left: 0;
	margin: 10px 0;
`

const Content = styled(Block)`
	padding: 20px 0;
	flex-direction: column;
	max-height: 70vh;
	overflow-y: auto;
`

const Button = styled(DrawOutBtn)`
	opacity: ${p => (p.checked ? 1 : 0.5)};
	cursor: ${p => (p.checked ? 'pointer' : 'not-allowed')};
`

function getWording(type) {
	switch (type) {
		case INFO_DIALOG_TYPE.PRIVACY:
			return privacyPolicyWording
		case INFO_DIALOG_TYPE.TOP_UP:
			return topUpWording
		case INFO_DIALOG_TYPE.DRAWING_PROBABILITY:
			return drawProbability
		case INFO_DIALOG_TYPE.REGISTER:
			return {
				...privacyPolicyWording,
				others: { ...privacyPolicyWording.others, ...topUpWording.others },
			}
		default:
			return null
	}
}

export default function InfoDialog() {
	const type = useSelector(() => dataStore.infoDialogType)
	const isRegisterByLine = useSelector(
		() =>
			!!dataStore.userInfo.accessToken &&
			dataStore.infoDialogType === INFO_DIALOG_TYPE.REGISTER
	)
	const defaultReferralCode = useSelector(() => dataStore.referralCode)
	const onClose = () => dataStore.setInfoDialogType()
	const [wording, setWording] = useState()
	const [referralCode, setReferralCode] = useState(defaultReferralCode || '')
	const [checked, setChecked] = useState(false)
	const isRegister = type === INFO_DIALOG_TYPE.REGISTER
	useEffect(() => {
		setWording(getWording(type))
		setChecked(false)
	}, [type])

	useEffect(() => {
		if (defaultReferralCode) setReferralCode(defaultReferralCode)
	}, [defaultReferralCode])

	useEffect(() => {
		if (!type || !wording) return
		document.getElementById('layout').scrollIntoView({ behavior: 'smooth' })
	}, [type, wording])

	if (!type || !wording) return null
	const keys = Object.keys(wording?.others)

	return (
		<>
			<Mask />
			<Container>
				<Header>
					<h3>{type}</h3>
				</Header>
				<Content>
					{(wording.content || []).map((item, index) => (
						<P key={index}>{item}</P>
					))}
					{keys.map((key, index) => (
						<Fragment key={`h${index}`}>
							<P center={true}>{key}</P>
							{wording.others[key].map((item, index) => {
								if (typeof item === 'object' && item.imgSrc) {
									return <Image key={index} src={item.imgSrc} />
								}
								return <P key={index}>{item}</P>
							})}
						</Fragment>
					))}
					{isRegister ? (
						<>
							<P center={true}>
								<Input
									placeholder="請輸入推薦碼（選填）"
									value={referralCode}
									onChange={e => setReferralCode(e.target.value)}
								/>
							</P>
							<P center={true} opacity="0.6">
								如果使用其他用戶的推薦碼進行註冊，在首次儲值超過300元時，您的朋友會額外得到50元的御守，價值等同於金幣
							</P>
							<P center={true}>
								<Checkbox onChange={e => setChecked(e.target.checked)}>
									我已閱讀並同意
								</Checkbox>
							</P>
						</>
					) : null}
				</Content>
				<Footer>
					<Button onClick={onClose} checked={true}>
						關閉
					</Button>
					{isRegister ? (
						<Button onClick={onRegister} checked={checked}>
							註冊
						</Button>
					) : null}
				</Footer>
			</Container>
		</>
	)
	function onRegister() {
		if (!checked) {
			dataStore.setAlertMessage('請先閱讀並同意條款')
			return
		}
		if (isRegisterByLine) dataStore.registerByLine(referralCode)
		else dataStore.register(referralCode)
	}
}

function Image({ src }) {
	const Img = lazy(() =>
		import(`@app/static/${src}`).then(module => ({
			default: () => <img src={module.default} />,
		}))
	)
	return (
		<Suspense fallback={<div>圖片載入中...</div>}>
			<Img />
		</Suspense>
	)
}
