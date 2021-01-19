import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import { style } from '../../themes/style'

function Cell (props){
    const {value, action} = props

    return(
        <TouchableOpacity 
            style={style.cell_to}
            onPress={action}
            disabled={value!=''?true:false}
        >
            <Text style={style.cell_text}>
                {value}
            </Text>
        </TouchableOpacity>
    )
}

export default Cell