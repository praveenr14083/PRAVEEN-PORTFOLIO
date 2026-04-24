import * as projectService from '../services/project.service.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'
import logger from '../utils/logger.js'

export const createProject = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      image: req.file ? { url: req.file.path, public_id: req.file.filename } : undefined,
    }

    const project = await projectService.createProject(data)
    return successResponse(res, project, 'Project created', 201)
  } catch (err) {
    next(err)
  }
}

export const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects(req.query)
    return successResponse(res, projects, 'Projects fetched')
  } catch (err) {
    next(err)
  }
}

export const getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id)

    if (!project) {
      return errorResponse(res, 'Project not found', 404)
    }

    return successResponse(res, project, 'Project fetched')
  } catch (err) {
    next(err)
  }
}

export const updateProject = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
    }

    if (req.file) {
      data.image = { url: req.file.path, public_id: req.file.filename }
    } else if (req.body.removeImage === 'true') {
      logger.debug(`Project Controller: Detected removeImage flag for project ${req.params.id}`)
      data.image = null
    }

    const project = await projectService.updateProject(req.params.id, data)

    if (!project) {
      return errorResponse(res, 'Project not found', 404)
    }

    return successResponse(res, project, 'Project updated')
  } catch (err) {
    next(err)
  }
}

export const deleteProject = async (req, res, next) => {
  try {
    const project = await projectService.deleteProject(req.params.id)

    if (!project) {
      return errorResponse(res, 'Project not found', 404)
    }

    return successResponse(res, null, 'Project deleted')
  } catch (err) {
    next(err)
  }
}
