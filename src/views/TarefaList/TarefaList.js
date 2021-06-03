import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasToolbar, TarefasTable } from './components';
//import { Dialog, DialogContent, DialogActions, DialogTitle, Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Listar, Salvar, Deletar, AlterarStatus } from '../../store/tarefasReducers'
import { EsconderMensagem} from '../../store/mensagensReducer'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefaList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.Listar();
  })

  return (
    <div className={classes.root}>
      <h1 style={{
        fontFamily: 'arial', textTransform: 'uppercase',
        letterSpacing: 20, textAlign: 'center', color: '#363636'
      }}>
        Lista de Tarefas
      </h1>
      <TarefasToolbar defaultValue={props.Salvar} />
      <div className={classes.content}>

        {props.informa ?
          <Alert
            onClose={props.EsconderMensagem}
            severity={props.severity}>
            <AlertTitle>{props.mensagem}</AlertTitle>
          </Alert> : (<></>)
        }
        <TarefasTable
          onClick={props.AlterarStatus}
          tarefas={props.tarefas}
          onMouseUp={props.Deletar}
        />
      </div>
      {/* <Dialog open={props.openDialog} onClose={props.EsconderMensagem}>
        <DialogTitle>ATENÇÃO</DialogTitle>
        <DialogContent>
          {props.mensagem}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.EsconderMensagem}>Fechar</Button>
        </DialogActions>
      </Dialog> */}

    </div>
  );
};

const mapStateToProps = state => ({
  tarefas: state.Tarefas.tarefas, //store.reducer.props
  mensagem: state.Mensagens.mensagem,
  openDialog: state.Mensagens.mostrarMensagem,
  informa: state.Mensagens.informa,
  severity: state.Mensagens.severity
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    Listar, Salvar, Deletar, AlterarStatus,
    EsconderMensagem,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
