import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
//import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  //Typography,
} from '@material-ui/core';

import TimerIcon from '@material-ui/icons/Timer';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TarefasTable = props => {
  const { className, tarefas, ...rest } = props;

  const classes = useStyles();
  const [erro, setErro] = useState(false)


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      { erro ?
        <Alert onClose={() => { setErro(false) }} severity="warning">
          <AlertTitle>ATENÇÃO</AlertTitle>
                 Não é possivel deletar tarefa pendente — &nbsp;
                  <strong>Por favor verificar status da tarefa!</strong>
        </Alert> : (<></>)
      }

      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Codigo</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map(tarefa => {
                  return (
                    <TableRow key={tarefa.id}>
                      <TableCell>{tarefa.id}</TableCell>
                      <TableCell>{tarefa.descricao}</TableCell>
                      <TableCell>{tarefa.categoria}</TableCell>
                      <TableCell>{tarefa.done ? 'Concluida' : 'Pendente'}</TableCell>
                      <TableCell>
                        <IconButton onClick={e => props.onClick(tarefa.id)}>
                          {
                            tarefa.done ?
                              (
                                <DoneAllIcon htmlColor='Green' />
                              ) :
                              (
                                <TimerIcon htmlColor='Red' />
                              )
                          }

                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {
                          tarefa.done ?
                            <DeleteIcon onClick={e => props.onMouseUp(tarefa.id)} /> :
                            <DeleteIcon onClick={() => { setErro(true) }} />
                        }

                      </TableCell>
                    </TableRow>
                  )
                })

                }
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>

    </Card>
  );
};

TarefasTable.propTypes = {
  className: PropTypes.string,
  tarefas: PropTypes.array.isRequired
};

export default TarefasTable;
