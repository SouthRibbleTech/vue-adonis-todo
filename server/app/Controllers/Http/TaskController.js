'use strict'
// const User = use('Apps/Models/User')
const Project = use('App/Models/Project')
const Task = use('App/Models/Task')
const AuthorizationService = use('App/Services/AuthorizationService')

class TaskController {

    async index({ auth, request, params}){
        const user = await auth.getUser()
        const { id } = params
        const project = await Project.find(id)
        AuthorizationService.verifyPermission(project, user)
        return project.tasks().fetch()
    }

    async create({ auth, request, params }){
        const user = await auth.getUser()
        const { description } = request.all()
        const { id } = params
        const project = await Project.find(id)
        AuthorizationService.verifyPermission(project, user)
        const task = new Task()
        task.fill({
            description
        })
        await task.user().associate(user)
        await task.project().associate(project)
        await task.save()
        return task
    }

    async destroy({ auth, request, params }){
        const user = await auth.getUser()
        const { id } = request.all()
        const task = Task.find(id)
        AuthorizationService.verifyPermission(task, user)
        task.delete()
        return task
    }

    async update({ auth, request, params }){
        const user = await auth.getUser()
        const id = params.id
        
        const { description } = request.all()
        const task = await Task.find(id)
        AuthorizationService.verifyPermission(task, user)
        task.merge(request.only(['description', 'completed']))
        await task.save()
        return task
    }

    async destroy({ auth, request, params}){
        const user = await auth.getUser()
        const id = params.id
        const task = await Task.find(id)
        AuthorizationService.verifyPermission(task, user)
        task.delete()
        return task
    }
}

module.exports = TaskController
