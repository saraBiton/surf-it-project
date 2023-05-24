import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { getAll } from '../src/Service';
import { basicUrl } from '../src/config';
import _ from 'lodash';

class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HeadTable: ['firstName', 'lastName', 'phones', 'password', 'role', '_id'],
            DataTable: [],
        };
    }
    componentDidMount() {
        getAll().then((data) => {
            console.log(data);
            if (typeof data !== 'object') {
                console.error('Data is not an object');
                return;
            }
            const dataArray = Object.values(data);
            console.log("dataArray:", dataArray[0]);
            const formattedData = dataArray[0].map((user) => {
                let phones = '';
                if (Array.isArray(user.phones) && user.phones.length > 0) {
                    phones = user.phones.join(', ');
                }
                console.log("user.firstName:", user.firstName, "user.lastName:", user.lastName, user.password, phones, user.role, user._id);
                return [user.firstName, user.lastName, user.password, phones, user.role, user._id];

            });
            this.setState({ DataTable: formattedData });
        });
    }
    render() {
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < state.HeadTable.length; i++) {
            const rowData = [state.HeadTable[i]];
            for (let j = 0; j < state.DataTable.length; j++) {
                rowData.push(state.DataTable[j][i]);
            }
            tableData.push(rowData);
        }
        return (
            <View style={styles.container}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#ffa1d2' }}>
                    {tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                            {rowData.map((cellData, cellIndex) => (
                                <Cell key={cellIndex} data={cellData} textStyle={styles.textStyle} />
                            ))}
                        </TableWrapper>
                    ))}
                </Table>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        paddingTop: 35,
        backgroundColor: '#ffffff',
    },
    HeadStyle: {
        height: 50,
        alignContent: 'center',
        backgroundColor: '#ffe0f0',
    },
    TableText: {
        margin: 10,
    },
    textStyle: {
        margin: 10,
        textAlign: 'center',
        fontWeight: 'normal'
    },
    headerRow: {
        height: 50,
        backgroundColor: '#f1f8ff'
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
});

export default TableData;


  //מציג טבלה מסודרת לאורך וחמש כותרות גדולות בהתחלה
    // render() {
    //     const state = this.state;
    //     const tableData = [];
    //     for (let i = 0; i < state.HeadTable.length; i++) {
    //         const rowData = [state.HeadTable[i]];
    //         for (let j = 0; j < state.DataTable.length; j++) {
    //             rowData.push(state.DataTable[j][i]);
    //         }
    //         tableData.push(rowData);
    //     }
    //     return (
    //         <View style={styles.container}>
    //             <Table borderStyle={{ borderWidth: 1, borderColor: '#ffa1d2' }}>
    //                 {state.HeadTable.map((title, index) => (
    //                     <Row key={index} data={[title]} style={styles.headerRow} textStyle={styles.headerText} />
    //                 ))}
    //                 {tableData.map((rowData, index) => (
    //                     <TableWrapper key={index} style={styles.row}>
    //                         {rowData.map((cellData, cellIndex) => (
    //                             <Cell key={cellIndex} data={cellData} textStyle={styles.textStyle} />
    //                         ))}
    //                     </TableWrapper>
    //                 ))}
    //             </Table>
    //         </View>
    //     );
    // }
