import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Card, ListItem, Icon } from 'react-native-elements';
import { Constants, BackHandler } from 'expo';
import Header from './Header';
import { ScrollView } from 'react-native-gesture-handler';

export default class App extends React.Component {

	state = {
		Bitcoin: 0,
		Dollar: 0,
		Euro: 0
	}

	refreshBitcoin = async () => {
		// Bitcoin
		let BTC = 0
		fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
			.then(results => {
				return results.json()
			}).then(data => {
				BTC = parseFloat(data.bpi.USD.rate.replace(',', '')).toFixed(2)
				this.setState({ Bitcoin: BTC })
			})
	}

	refreshDollar = async () => {
		// Dollar
		let Dollar = 0
		fetch('https://api.exchangeratesapi.io/latest?base=USD')
			.then(results => {
				return results.json()
			}).then(data => {
				Dollar = data.rates.BRL.toFixed(2)
				this.setState({ Dollar: Dollar })
			})
	}

	refreshEuro = async () => {
		// Euro
		let Euro = 0
		fetch('https://api.exchangeratesapi.io/latest?base=EUR')
			.then(results => {
				return results.json()
			}).then(data => {
				Euro = data.rates.BRL.toFixed(2)
				this.setState({ Euro: Euro })
			})
	}

	refreshValues = async () => {
		this.refreshBitcoin()
			.then(() => {
				this.refreshDollar()
					.then(() => {
						this.refreshEuro()
							.then(() => console.log('lol'))
					})
			})
	}

	componentDidMount() {
		this.refreshValues()
	}

	render() {
		this.rightButton = {
			title: 'Atualizar',
			handler: () => {
				this.refreshValues()
			}
		}

		console.log('Refreshed!')

		const { Bitcoin, Dollar, Euro } = this.state

		return (
			<View style={styles.app}>
				<Header rightButton={this.rightButton} />
				<ScrollView style={styles.content}>
					<Card title="Bitcoin">
						<View style={styles.card}>
							<Image
								style={styles.img}
								resizeMode="cover"
								source={require('./assets/bitcoin.jpg')}
							/>
							<Text style={styles.name}>R$ {(Bitcoin * Dollar).toFixed(2)}</Text>
						</View>
					</Card>
					<Card title="Dólar">
						<View style={styles.card}>
							<Image
								style={styles.img}
								resizeMode="cover"
								source={require('./assets/dollar.jpeg')}
							/>
							<Text style={styles.name}>R$ {Dollar}</Text>
						</View>
					</Card>
					<Card title="Euro" style={{}}>
						<View style={styles.card}>
							<Image
								style={styles.img}
								resizeMode="cover"
								source={require('./assets/euro.jpg')}
							/>
							<Text style={styles.name}>R$ {Euro}</Text>
						</View>
					</Card>
					<View style={{height: 75}}/>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		height: '100%'
	},
	app: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
	},
	img: {
		resizeMode: 'cover',
		width: '100%',
		height: 150
	},
	name: {
		marginTop: 10,
		fontSize: 24
	}
});