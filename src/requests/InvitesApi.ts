import { VRChatAPI } from "../VRChatAPI";
import { ApiPaths } from "../types/ApiPaths";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Invites API.
 */
export class InvitesApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }


    /**
     * Sends an invite to a user. Returns the Notification of type `invite` that was sent.
     */
    public async inviteUser({
        userId,
        instanceId,
        messageSlot
    }: VRCAPI.Invites.Requests.InviteUserRequest): Promise<VRCAPI.Notifications.Models.SentNotification> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.invites.inviteUser,
            pathFormated: ApiPaths.invites.inviteUser.path.replace('{userId}', userId),
            body: {
                instanceId,
                messageSlot
            }
        };

        return await this.executeRequest<VRCAPI.Notifications.Models.SentNotification>(paramRequest);
    }

    /**
     * Sends self an invite to an instance.
     */
    public async inviteMyselfToInstance({
        instanceid,
        worldid
    }: VRCAPI.Invites.Requests.InviteMyselfToInstanceRequest): Promise<VRCAPI.Notifications.Models.SentNotification> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.invites.inviteMyselfToInstance,
            pathFormated: ApiPaths.invites.inviteMyselfToInstance.path.replace('{instanceId}', instanceid).replace('{worldId}', worldid),
        };

        return await this.executeRequest<VRCAPI.Notifications.Models.SentNotification>(paramRequest);
    }

    /**
     * Requests an invite from a user. Returns the Notification of type `requestInvite` that was sent.
     */
    public async requestInvite({
        userId,
        messageSlot
    }: VRCAPI.Invites.Requests.RequestInviteRequest): Promise<VRCAPI.Notifications.Models.Notification> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.invites.requestInvite,
            pathFormated: ApiPaths.invites.requestInvite.path.replace('{userId}', userId),
            body: {
                messageSlot
            }
        };

        return await this.executeRequest<VRCAPI.Notifications.Models.Notification>(paramRequest);
    }

    /**
     * Respond to an invite request by sending a world invite to the requesting user. `:notificationId` is the ID of the requesting notification.
     */
    public async respondInvite({
        notificationId,
        responseSlot
    }: VRCAPI.Invites.Requests.InviteResponseRequest): Promise<VRCAPI.Notifications.Models.Notification> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.invites.respondInvite,
            pathFormated: ApiPaths.invites.respondInvite.path.replace('{notificationId}', notificationId),
            body: {
                responseSlot
            }
        };

        return await this.executeRequest<VRCAPI.Notifications.Models.Notification>(paramRequest);
    }

    /**
    * Returns a list of all the users Invite Messages. Admin Credentials are required to view messages of other users!
    *
    * Message type refers to a different collection of messages, used during different types of responses.
    * - message = Message during a normal invite
    * - response = Message when replying to a message
    * - request = Message when requesting an invite
    * - requestResponse = Message when replying to a request for invite
    */
    public async listInviteMessages({
        userId,
        messageType
    }: VRCAPI.Invites.Requests.ListInviteMessagesRequest): Promise<VRCAPI.Invites.Models.InviteMessage[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.invites.listInviteMessages,
            pathFormated: ApiPaths.invites.listInviteMessages.path.replace('{userId}', userId).replace('{messageType}', messageType),
        };

        return await this.executeRequest<VRCAPI.Invites.Models.InviteMessage[]>(paramRequest);
    }

    /**
    * Returns a single Invite Message. This returns the exact same information but less than `getInviteMessages`. Admin Credentials are required to view messages of other users!
    * 
    * Message type refers to a different collection of messages, used during different types of responses.
    * - message = Message during a normal invite
    * - response = Message when replying to a message
    * - request = Message when requesting an invite
    * - requestResponse = Message when replying to a request for invite
    */
    public async getInviteMessage({
        userId,
        messageType,
        slot
    }: VRCAPI.Invites.Requests.GetInviteMessageRequest): Promise<VRCAPI.Invites.Models.InviteMessage> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.invites.getInviteMessage,
            pathFormated: ApiPaths.invites.getInviteMessage.path.replace('{userId}', userId).replace('{messageType}', messageType).replace('{slot}', slot.toString()),
        };

        return await this.executeRequest<VRCAPI.Invites.Models.InviteMessage>(paramRequest);
    }

    /**
    * Updates a single Invite Message and then returns a list of all of them. Admin Credentials are required to update messages of other users!
    *
    * Updating a message automatically sets the cooldown timer to 60 minutes. Trying to edit a message before the cooldown timer expires results in a 429 "Too Fast Error".
    * 
    * Message type refers to a different collection of messages, used during different types of responses.
    * - message = Message during a normal invite
    * - response = Message when replying to a message
    * - request = Message when requesting an invite
    * - requestResponse = Message when replying to a request for invite

     */
    public async updateInviteMessage({
        userId,
        messageType,
        slot,
        message
    }: VRCAPI.Invites.Requests.UpdateInviteMessageRequest): Promise<VRCAPI.Invites.Models.InviteMessage[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.invites.updateInviteMessage,
            pathFormated: ApiPaths.invites.updateInviteMessage.path.replace('{userId}', userId).replace('{messageType}', messageType).replace('{slot}', slot.toString()),
            body: {
                message
            }
        };

        return await this.executeRequest<VRCAPI.Invites.Models.InviteMessage[]>(paramRequest);
    }

    /**
    * Resets a single Invite Message back to its original message, and then returns a list of all of them. Admin Credentials are required to update messages of other users!
    * 
    * Resetting a message respects the rate-limit, so it is not possible to reset within the 60 minutes countdown. Resetting it does however not set the rate-limit to 60 like when editing it. It is possible to edit it right after resetting it. Trying to edit a message before the cooldown timer expires results in a 429 "Too Fast Error".
    * 
    * Message type refers to a different collection of messages, used during different types of responses.
    * - message = Message during a normal invite
    * - response = Message when replying to a message
    * - request = Message when requesting an invite
    * - requestResponse = Message when replying to a request for invite
    */
    public async resetInviteMessage({
        userId,
        messageType,
        slot
    }: VRCAPI.Invites.Requests.ResetInviteMessageRequest): Promise<VRCAPI.Invites.Models.InviteMessage[]> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.invites.resetInviteMessage,
            pathFormated: ApiPaths.invites.resetInviteMessage.path.replace('{userId}', userId).replace('{messageType}', messageType).replace('{slot}', slot.toString()),
        };

        return await this.executeRequest<VRCAPI.Invites.Models.InviteMessage[]>(paramRequest);
    }
}