const model = require('../model');
const boom = require('boom');

const handlers = {
  /**
   * Return a task
   *
   * @param request
   * @param reply
   */
  get: (request, reply) => {
    const taskUuid = request.params.uuid;
    const task = model.tasks.actions.find(taskUuid);
    if (task) {
      return reply(task);
    }
    return reply(boom.notFound());
  },
  /**
   * Return a listComments of dummy task items
   *
   * @param request
   * @param reply
   */
  list: (request, reply) => {
    const tasks = model.tasks.actions.list();
    reply(tasks);
  },
  /**
   * Create a new task
   *
   * @param request
   * @param reply
   */
  create: (request, reply) => {
    const data = request.payload;
    const task = model.tasks.actions.create(data);
    reply(task).code(201);
  },
  /**
   * Store the passed task item
   *
   * @param request
   * @param reply
   */
  update: (request, reply) => {
    const taskUuid = request.params.uuid;
    if (model.tasks.actions.update(taskUuid, request.payload) === false) {
      reply(boom.badRequest());
    } else {
      reply().code(204);
    }
  },
  /**
   *
   * @param request
   * @param reply
   */
  remove: (request, reply) => {
    const taskUuid = request.params.uuid;
    if (model.tasks.actions.remove(taskUuid) === false) {
      reply(boom.badRequest());
    } else {
      reply().code(204);
    }
  },
};

module.exports.handlers = handlers;
