import styled from 'styled-components'
import { useSelector, dataStore } from '@app/store'
import { DrawOutBtn as Button } from '@app/pages/commodity'
import { useEffect, useState } from 'react'

const Mask = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: ${p => p.theme.color.mask};
	border-radius: ${p => p.theme.borderRadius.content};
	z-index: ${p => p.theme.zIndex.alertMask};
`

const Container = styled.div`
	position: absolute;
	opacity: 1;
	top: 25vh;
	width: 60%;
	left: 20%;
	z-index: ${p => p.theme.zIndex.alertDialog};
	display: flex;
	min-height: 230px;
	font-size: 1.15rem;
	flex-direction: column;
	background: ${p => p.theme.color.background};
	border: 1px solid ${p => p.theme.color.dialogBorder};
	border-radius: ${p => p.theme.borderRadius.dialogContainer};
	padding: 15px 35px 40px;
	display: flex;
	@media (max-width: 768px) {
		width: 90%;
		left: 5%;
	}
`

const Toast = styled.div`
	position: absolute;
	opacity: 1;
	top: 25vh;
	width: 30%;
	left: 40%;
	z-index: ${p => p.theme.zIndex.alertDialog};
	display: flex;
	/* min-height: 230px; */
	font-size: 1.15rem;
	flex-direction: column;
	background: ${p => p.theme.color.background};
	border: 1px solid ${p => p.theme.color.dialogBorder};
	border-radius: ${p => p.theme.borderRadius.dialogContainer};
	/* padding: 15px ; */
	display: flex;
	/* @media (max-width: 768px) {
    width: 90%;
    left: 5%;
  } */
`

const Block = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
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
	p {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

export default function AlertDialog() {
	const msg = useSelector(() => dataStore.alertMessage)
	const isToast = useSelector(() => dataStore.isToast)
	const onClose = () => dataStore.clearAlertMessage()
	const [seconds, setSeconds] = useState(500)

	useEffect(() => {
		if (msg)
			document.getElementById('layout').scrollIntoView({ behavior: 'smooth' })
	}, [msg])

	useEffect(() => {
		if (!isToast) return
		if (seconds > 0) {
			const timerId = setTimeout(() => {
				setSeconds(seconds - 100)
			}, 100)

			return () => {
				clearTimeout(timerId)
			}
		} else {
			dataStore.clearAlertMessage()
			setSeconds(500)
		}
	}, [seconds, isToast])

	if (!msg) return null
	if (isToast)
		return (
			<>
				<Mask />
				<Toast>
					<Content>
						<p>{msg}</p>
					</Content>
				</Toast>
			</>
		)
	return (
		<>
			<Mask />
			<Container>
				<Content>
					<p>{msg}</p>
				</Content>
				<Footer>
					<Button onClick={onClose}>關閉</Button>
				</Footer>
			</Container>
		</>
	)
}
