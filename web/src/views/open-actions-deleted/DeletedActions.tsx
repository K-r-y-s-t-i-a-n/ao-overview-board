import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  LoadingOverlay,
  ScrollArea,
  SimpleGrid,
  Table,
  Text,
  Title,
  createStyles,
} from '@mantine/core';
import {
  AppCard,
  LoadingElement,
  NothingFound,
  Notification,
  ViewWrapper,
} from '../../components/core';
import { useScreenSize } from '../../app/hooks';
import { useState } from 'react';
import { Action } from '../../app/interfaces';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, queryKeys } from '../../app/api';
import { openConfirmModal } from '@mantine/modals';
import { AxiosError } from 'axios';
import { useDeletedActions } from '../../app/api/hooks/useDeletedActions';
import { useActions } from '../../app/api/hooks/useActions';

const getColor = (status: string) => {
  return status === 'Stopped'
    ? 'red'
    : status === 'RWI'
    ? 'blue'
    : status === 'Testing'
    ? 'green'
    : 'gray';
};

const deleteRequest = async (id: string) => {
  return await api.delete(`/actions/force/${id}`).then((res) => res.data);
};

const restoreRequest = async (id: string) => {
  return await api.get(`/actions/restore/${id}`).then((res) => res.data);
};

const useStyles = createStyles(() => ({
  tableRow: {
    '&:hover': { cursor: 'pointer' },
  },
}));

const DeletedActions = () => {
  const [isMutating, setMutating] = useState(false);
  const { refetch: refetchActions } = useActions();
  const { actions, isLoading } = useDeletedActions();
  const queryCache = useQueryClient();
  const { classes } = useStyles();
  // const canCreateActions = usePermissions(PERMISSIONS.CREATE_ACTIONS);
  const { smMaxScreen } = useScreenSize();
  const [showActionDetails, setshowActionDetails] = useState<Action | undefined>(
    undefined
  );
  const deleteActionMutation = useMutation({
    mutationFn: (id: string) => deleteRequest(id),
    onSuccess: (res) => {
      queryCache.setQueryData([queryKeys.deletedActions], (actions?: Action[]) => {
        if (actions) {
          const filteredActions = actions.filter((obj) => obj.id != res.id);
          return filteredActions || undefined;
        }
      });
      refetchActions();
      queryCache.invalidateQueries([queryKeys.deletedActions]);
      // queryCache.invalidateQueries([queryKeys.actions]);
      queryCache.invalidateQueries([queryKeys.user]);

      setMutating(false);
      Notification({
        success: true,
        message: 'The action has been permanently deleted.',
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        Notification({
          error: true,
          message: `Could not delete the action. ${err.message}`,
        });
      }
      setMutating(false);
    },
  });

  const restoreActionMutation = useMutation({
    mutationFn: (id: string) => restoreRequest(id),
    onSuccess: (res) => {
      queryCache.setQueryData([queryKeys.deletedActions], (actions?: Action[]) => {
        if (actions) {
          const filteredActions = actions.filter((obj) => obj.id != res.id);
          return filteredActions || undefined;
        }
      });
      queryCache.invalidateQueries([queryKeys.actions]);
      queryCache.invalidateQueries([queryKeys.deletedActions]);
      queryCache.invalidateQueries([queryKeys.user]);

      setMutating(false);
      Notification({ success: true, message: 'The action has been restored.' });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        Notification({
          error: true,
          message: `Could not restore the action. ${err.message}`,
        });
      }
      setMutating(false);
    },
  });

  const getPadding = () => {
    if (smMaxScreen) {
      return { paddingLeft: 0, paddingRight: 0 };
    }
  };

  // ============== ACTION DETAILS JSX ==================

  if (showActionDetails)
    return (
      <ViewWrapper>
        <Group position="apart">
          <Button color="dark" onClick={() => setshowActionDetails(undefined)} mb={16}>
            Back to table
          </Button>

          <Group>
            <Button
              variant="outline"
              color="green"
              mb={16}
              onClick={() => {
                openConfirmModal({
                  title: (
                    <Text fz={'md'} weight={600}>
                      Are you sure you want to restore action?
                    </Text>
                  ),
                  // centered: true,
                  confirmProps: {
                    color: 'green',
                    size: 'sm',
                    radius: 'md',
                  },
                  cancelProps: {
                    color: 'gray',
                    size: 'sm',
                    radius: 'md',
                  },
                  children: (
                    <Box
                      sx={{
                        background: 'rgb(246, 255, 245, 1)',
                        color: '#52fa76',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '0.0625rem solid transparent',
                      }}
                    >
                      <Group>
                        <Text fz={'1rem'} fw={700} lineClamp={1.55}>
                          Asset:
                        </Text>
                        <Text fz={'1rem'} fw={600} lineClamp={1.55}>
                          {showActionDetails.asset.name}
                        </Text>
                      </Group>

                      <Group>
                        <Text fz={'1rem'} fw={700} lineClamp={1.55}>
                          Issue:
                        </Text>
                        <Text fz={'1rem'} fw={600} lineClamp={1.55} ml="3px">
                          {showActionDetails.issue}
                        </Text>
                      </Group>
                    </Box>
                  ),
                  labels: {
                    confirm: 'RESTORE',
                    cancel: 'Cancel',
                  },
                  onCancel: () => {
                    // setSelectedTagId(undefined);
                  },
                  onConfirm: () => {
                    restoreActionMutation.mutate(showActionDetails.id);
                    setshowActionDetails(undefined);
                    setMutating(true);
                  },
                });
              }}
            >
              RESTORE ACTION
            </Button>
            <Button
              variant="outline"
              color="red"
              mb={16}
              onClick={() => {
                openConfirmModal({
                  title: (
                    <Text fz={'md'} weight={600}>
                      Do you want to permanently delete the action?
                    </Text>
                  ),
                  // centered: true,
                  confirmProps: {
                    color: 'red',
                    size: 'sm',
                    radius: 'md',
                  },
                  cancelProps: {
                    color: 'gray',
                    size: 'sm',
                    radius: 'md',
                  },
                  children: (
                    <Box
                      sx={{
                        background: 'rgb(255, 245, 245, 1)',
                        color: '#fa5252',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '0.0625rem solid transparent',
                      }}
                    >
                      <Group>
                        <Text fz={'1rem'} fw={700} lineClamp={1.55}>
                          Asset:
                        </Text>
                        <Text fz={'1rem'} fw={600} lineClamp={1.55}>
                          {showActionDetails.asset.name}
                        </Text>
                      </Group>

                      <Group>
                        <Text fz={'1rem'} fw={700} lineClamp={1.55}>
                          Issue:
                        </Text>
                        <Text fz={'1rem'} fw={600} lineClamp={1.55} ml="3px">
                          {showActionDetails.issue}
                        </Text>
                      </Group>
                    </Box>
                  ),
                  labels: {
                    confirm: 'DELETE',
                    cancel: 'Cancel',
                  },
                  onCancel: () => {
                    // setSelectedTagId(undefined);
                  },
                  onConfirm: () => {
                    deleteActionMutation.mutate(showActionDetails.id);
                    setshowActionDetails(undefined);
                    setMutating(true);
                  },
                });
              }}
            >
              DELETE ACTION
            </Button>
          </Group>
        </Group>
        {/* 
        <Box mb={16}>
          <strong>ACTION DETAILS</strong>
        </Box> */}
        <AppCard
          mb={16}
          // bg={getColor(showActionDetails.status)}
          bg="#efdfdd"
        >
          <SimpleGrid cols={4} spacing={'sm'}>
            <Box>
              <Text fz={'md'} fw={700} color="brand">
                Asset
              </Text>
              <Text color="brand" fw={500}>
                {showActionDetails?.asset.name || '-'}
              </Text>
            </Box>

            <Box>
              <Text fz={'md'} fw={700} color="brand">
                Issue
              </Text>
              <Text color="brand" fw={500}>
                {showActionDetails?.issue || '-'}
              </Text>
            </Box>
            <Box>
              <Text fz={'md'} fw={700} color="brand">
                Created
              </Text>
              <Text fw={500} color="brand">
                {format(new Date(showActionDetails.created_at), 'dd MMMM yyyy')}
              </Text>
            </Box>

            <>
              <Box>
                <Text fz={'md'} fw={700} color="brand">
                  Closed
                </Text>
                <Text fw={500} color="brand">
                  {showActionDetails.deleted_at
                    ? format(new Date(showActionDetails.deleted_at), 'dd MMMM yyyy')
                    : 'N/A'}
                </Text>
              </Box>
            </>
          </SimpleGrid>
        </AppCard>

        <Box mb="sm">
          <strong>Current step:</strong>
        </Box>
        <AppCard mb={16}>
          {/* MIDDLE ROW TEXT */}
          <Card.Section
            px={smMaxScreen ? '0px' : 'xs'}
            mb="xs"
            // mt="xs"
          >
            <Text mx="xs" size="sm" weight="500" mt="md">
              {showActionDetails.steps[0].text}
            </Text>
          </Card.Section>
          {/* BOTTOM ROW */}
          <Card.Section py="xs" px={smMaxScreen ? '0px' : 'xs'} bg={'#f4f6fa'}>
            <Group position="apart" p={0}>
              <Text mx="xs" color="dimmed" size="xs" weight={600} m={0}>
                {showActionDetails.steps[0].added_by}
              </Text>

              <Badge
                color="gray"
                size="md"
                //  bg="#f4f6fa"
              >
                {format(new Date(showActionDetails.steps[0].updated_at), 'dd/MM/yyyy')}
              </Badge>
            </Group>
          </Card.Section>
        </AppCard>

        {showActionDetails.steps.length > 1 && (
          <Box mb="sm">
            <strong>Steps taken:</strong>
          </Box>
        )}

        {showActionDetails.steps.map((step, i) => {
          if (i === 0) {
            return null;
          }
          return (
            <AppCard mb={16}>
              {/* MIDDLE ROW TEXT */}
              <Card.Section
                px={smMaxScreen ? '0px' : 'xs'}
                mb="xs"
                // mt="xs"
              >
                <Text mx="xs" size="sm" weight="500" mt="md">
                  {step.text}
                </Text>
              </Card.Section>
              {/* BOTTOM ROW */}
              <Card.Section py="xs" px={smMaxScreen ? '0px' : 'xs'} bg={'#f4f6fa'}>
                <Group position="apart" p={0}>
                  <Text mx="xs" color="dimmed" size="xs" weight={600} m={0}>
                    {step.added_by}
                  </Text>

                  <Badge
                    color="gray"
                    size="md"
                    //  bg="#f4f6fa"
                  >
                    {format(new Date(step.updated_at), 'dd/MM/yyyy')}
                  </Badge>
                </Group>
              </Card.Section>
            </AppCard>
          );
        })}
      </ViewWrapper>
    );

  // ============== OPEN ACTIONS JSX ==================

  return (
    <ViewWrapper>
      <Title mb={12}>Archived Actions</Title>
      <Grid>
        <Grid.Col span="auto" sx={getPadding()}>
          {isLoading ? (
            <LoadingElement text="Loading actions..." />
          ) : (
            <>
              {actions.length === 0 ? (
                <NothingFound text="No actions here..." />
              ) : (
                <>
                  {/* ========== ACTIONS MOBILE VIEW ============== */}
                  {smMaxScreen ? (
                    actions.map((el) => (
                      <AppCard key={el.id + 'el'} p={4} mb={8}>
                        <Badge
                          color={getColor(el.status)}
                          radius="sm"
                          w="100%"
                          m={0}
                          mb={4}
                          size="lg"
                          // variant="filled"
                        >
                          {el.asset.name}
                        </Badge>
                        <Group>
                          <Text fw={600} fz="sm" ml={2}>
                            Issue:
                          </Text>
                          <Text fw={500} fz="sm">
                            {el.issue}
                          </Text>
                        </Group>
                        <Group>
                          <Text fw={600} fz="sm" ml={2}>
                            Current step:
                          </Text>
                          <Text fw={500} fz="sm">
                            {el.steps[0].text}
                          </Text>
                        </Group>
                        <Group>
                          <Text fw={600} fz="sm" ml={2}>
                            Last updated:
                          </Text>
                          <Text fw={500} fz="sm">
                            DATE HERE
                          </Text>
                        </Group>
                      </AppCard>
                    ))
                  ) : (
                    <Card shadow="md" m={0} radius="md">
                      <LoadingOverlay visible={isMutating} overlayBlur={2} />
                      <ScrollArea sx={{ animation: 'slide-up .3s' }}>
                        <Table striped highlightOnHover withColumnBorders>
                          <thead>
                            <tr>
                              <th>Asset</th>
                              <th>Issue</th>
                              <th>Current step</th>
                              <th>Closed</th>
                            </tr>
                          </thead>
                          {/* =========== ACTIONS TABLE ROWS ============= */}
                          <tbody>
                            {actions.map((el) => (
                              <tr
                                key={el.id}
                                onClick={() => {
                                  setshowActionDetails(el);
                                }}
                                className={classes.tableRow}
                              >
                                <td>
                                  <Text fw={500}>{el.asset.name}</Text>
                                </td>

                                <td>
                                  <Text fw={500}>{el.issue}</Text>
                                </td>
                                <td>
                                  <Text
                                    fw={500}
                                    // color={getColor(el.status)}
                                  >
                                    {el.steps[0].text}
                                  </Text>
                                </td>
                                <td>
                                  <Text fw={500}>
                                    {format(new Date(el.deleted_at), 'dd/MM/yyyy')}
                                  </Text>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </ScrollArea>
                    </Card>
                  )}
                </>
              )}
            </>
          )}
        </Grid.Col>
      </Grid>
    </ViewWrapper>
  );
};

export default DeletedActions;
