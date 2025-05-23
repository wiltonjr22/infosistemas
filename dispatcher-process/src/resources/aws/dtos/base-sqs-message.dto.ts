export const SQS_QUEUES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  REMOVE: 'REMOVE',
} as const;

export type SqsQueueName = keyof typeof SQS_QUEUES;

export const SQS_QUEUE_ENV_NAMES: Record<SqsQueueName, string> = {
  CREATE: 'SQS_CREATE_QUEUE_URL',
  UPDATE: 'SQS_UPDATE_QUEUE_URL',
  REMOVE: 'SQS_REMOVE_QUEUE_URL',
};
