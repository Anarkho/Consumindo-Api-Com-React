import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios'
import { baseUrl, headers } from '../../services/api'
import { Dialog, DialogContent, DialogActions, DialogTitle, Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));
/////////////////////////////////////////////////////
const TarefaList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [informa, setInfo] = useState(false)
  const [severity, setSeverity] = useState('info')

  const salvar = (tarefa) => {
    axios.post(baseUrl, tarefa, {
      headers
    }).then(response => {
      const novaTarefa = response.data
      setTarefas([...tarefas, novaTarefa])
      setMensagem('Tarefa adicionada com sucesso!')
      setInfo(true)
      setSeverity('success')
    }).catch(erro => {
      setMensagem("Erro ao cadastrar tarefa!")
      setInfo(true)
      setSeverity('error')
    })
  }
  /////////////////////////////////////////////////////
  const ListarTarefas = () => {
    axios.get(baseUrl, {
      headers
    }).then(response => {
      const ListaTarefas = response.data
      setTarefas(ListaTarefas)
    }).catch(erro => {
      setMensagem("Erro ao recuperar lista!")
      setOpenDialog(true)
    })
  }
  //////////////////////////////////////////////////////
  useEffect(() => {
    ListarTarefas()
  }, [])
  //////////////////////////////////////////////////////
  const alterarStatus = (id) => {
    axios.patch(`${baseUrl}/${id}`, null, {
      headers
    }).then(response => {
      const lista = [...tarefas]
      lista.forEach(tarefa => {
        if (tarefa.id === id) {
          tarefa.done = true
        }
      })
      setTarefas(lista)
      setInfo(true)
      setMensagem('Status da tarefa atualizado com sucesso!')
      setSeverity('success')
    }).catch(erro => {

    })
  }
  //////////////////////////////////////////////////////
  const deletar = (id) => {
    axios.delete(`${baseUrl}/${id}`, {
      headers
    }).then(response => {
      const lista = tarefas.filter(tarefa => tarefa.id !== id) // retorna todas tarefas diferente do id da excluida
      setTarefas(lista)
      setSucesso(true)
    }).catch(erro => {

    })
  }

  return (
    <div className={classes.root}>
      <h1 style={{
        fontFamily: 'arial', textTransform: 'uppercase',
        letterSpacing: 20, textAlign: 'center', color: '#363636'
      }}>
        Lista de Tarefas
      </h1>
      <TarefasToolbar defaultValue={salvar} />
      <div className={classes.content}>
        {sucesso ?
          <Alert
            onClose={(e) => {
              setSucesso(false)
            }}
            severity="success">
            <AlertTitle>TAREFA ELIMINADA</AlertTitle>
             Tarefa deletada com sucesso — &nbsp;
              <strong>Concluido</strong>
          </Alert> : (<></>)
        }
        {informa ?
          <Alert
          onClose={e => setInfo(false)}
           severity={severity}>
             <AlertTitle>{mensagem}</AlertTitle>
             </Alert> : <></>
        }
        <TarefasTable
          onClick={alterarStatus}
          tarefas={tarefas}
          onMouseUp={deletar}
        />
      </div>
      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
        <DialogTitle>ATENÇÃO</DialogTitle>
        <DialogContent>
          {mensagem}
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default TarefaList;
