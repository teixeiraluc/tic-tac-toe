import React, { useState, useEffect } from 'react'
import { View, Button, Text } from 'react-native'

import { style } from './src/themes/style'

import Cell from './src/components/Cell'

export default function App() {
    // Estado referente a rodada
    const [turn, setTurn] = useState('')

    // Vetor de estados para cada célula do tictactoe
    const [plays, setPlays] = useState([{move:''},{move:''},{move:''},{move:''},{move:''},{move:''},{move:''},{move:''},{move:''}])

    // Vetor de estados para contagem de placar
    const [counter, setCounter] = useState([{times:0}, {times:0}])

    useEffect(()=>{
        if( // Casos horizontais
            plays[0].move == plays[1].move && plays[1].move == plays[2].move && plays[0].move != '' ||
            plays[3].move == plays[4].move && plays[4].move == plays[5].move && plays[3].move != '' ||
            plays[6].move == plays[7].move && plays[7].move == plays[8].move && plays[6].move != '' ||

            // Casos verticais
            plays[0].move == plays[3].move && plays[3].move == plays[6].move && plays[0].move != '' ||
            plays[1].move == plays[4].move && plays[4].move == plays[7].move && plays[1].move != '' ||
            plays[2].move == plays[5].move && plays[5].move == plays[8].move && plays[2].move != '' ||

            // Casos diagonais
            plays[0].move == plays[4].move && plays[4].move == plays[8].move && plays[0].move != '' ||
            plays[2].move == plays[4].move && plays[4].move == plays[6].move && plays[2].move != ''){
                // Adicionando a vitória ao jogador ganhador
                turn=='X'?counter[0].times=counter[0].times+1:counter[1].times=counter[1].times+1
                setCounter([...counter])

                // Reiniciando a rodada inicial
                setTurn('')
                
                // Reiniciando as celulas para o valor vazio
                plays.forEach(item => item.move = '')
                setPlays([...plays])
                
                // Notificando o vencedor
                return (alert(`O jogador ${turn} venceu!`))
            }
            // Vigiando o vetor de células em caso de mudança de estado
    },[plays])

    // Função que muda a vez na jogada e atualiza o valor das células
    function changeTurn(value){
        if(turn != 'X'){
            setTurn('X')
            plays[value].move='X'
            setPlays([...plays])
        }
        else{
            setTurn('O')
            plays[value].move='O'
            setPlays([...plays])
        }
    }

    // Reseta o vetor de estados das células
    function resetState(){
        plays.forEach(item => item.move = '')
        setPlays([...plays])
    }

    // Reseta o placar
    function resetScore(){
        counter.forEach(item => item.times = 0)
        setCounter([...counter])
    }

    // UI do jogo
    return (
        <View style={style.container}>
            <Text style={style.title}>Tic Tac Toe</Text>
            <View style={style.view_row}>
                <Cell value={plays[0].move} action={()=>{changeTurn(0)}}></Cell>
                <Cell value={plays[1].move} action={()=>{changeTurn(1)}}></Cell>
                <Cell value={plays[2].move} action={()=>{changeTurn(2)}}></Cell>
            </View>
            <View style={style.view_row}>
                <Cell value={plays[3].move} action={()=>{changeTurn(3)}}></Cell>
                <Cell value={plays[4].move} action={()=>{changeTurn(4)}}></Cell>
                <Cell value={plays[5].move} action={()=>{changeTurn(5)}}></Cell>
            </View>
            <View style={style.view_row}>
                <Cell value={plays[6].move} action={()=>{changeTurn(6)}}></Cell>
                <Cell value={plays[7].move} action={()=>{changeTurn(7)}}></Cell>
                <Cell value={plays[8].move} action={()=>{changeTurn(8)}}></Cell>
            </View>
            <View style={style.view_score}>
                <Text style={style.text_score}>Jogador X: {counter[0].times}</Text>
                <Text style={style.text_score}>Jogador O: {counter[1].times}</Text>
            </View>
            <View style={style.view_buttons}>
                <Button title='REINICIAR JOGO' onPress={()=>resetState()}/>
            </View>
            <View style={style.view_buttons}>
                <Button title='REINICIAR PLACAR' onPress={()=>resetScore()}/>
            </View>
        </View>
    )
}