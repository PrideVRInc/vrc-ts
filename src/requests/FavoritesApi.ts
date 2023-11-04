import { VRChatAPI } from "../VRChatAPI";
import { ApiPaths } from "../types/ApiPaths";
import { BaseApi } from "./BaseApi";

/**
 * This class is used to make requests to the Favorites API.
 */
export class FavoritesApi extends BaseApi {
    baseClass: VRChatAPI;

    constructor(baseClass: VRChatAPI) {
        super(baseClass);
        this.baseClass = baseClass;
    }

    
    /**
     * Returns a list of favorites.
     */
    public async listFavorites({
        type,
        n,
        offset,
        tag
    }: VRCAPI.Favorites.Requests.listFavoritesRequest): Promise<VRCAPI.Favorites.Models.Favorite[]> {
            
            const parameters: URLSearchParams = new URLSearchParams();
    
            if (type) {
                parameters.append('type', type);
            }
    
            if (n) {
                if (n > 100 || n < 1) throw new Error('Quantity must be between 1 and 100!');
                parameters.append('n', n.toString());
            }
    
            if (offset) {
                if (offset < 0) throw new Error('Offset must be greater than 0!');
                parameters.append('offset', offset.toString());
            }
    
            if (tag) {
                parameters.append('tag', tag);
            }
    
            const paramRequest: VRCAPI.Generics.executeRequestType = {
                currentRequest: ApiPaths.favorites.listFavorites,
                pathFormated: ApiPaths.favorites.listFavorites.path,
                queryOptions: parameters,
            };
    
            return await this.executeRequest<VRCAPI.Favorites.Models.Favorite[]>(paramRequest);


    }
    
    /**
     * Add a new favorite.

        Friend groups are named `group_0` through `group_3`. Avatar and World groups are named `avatars1` to `avatars4` and `worlds1` to `worlds4`.

        You cannot add people whom you are not friends with to your friends list. Destroying a friendship removes the person as favorite on both sides.
     */
    public async addFavorite({
        type,
        favoriteId,
        tags
    }: VRCAPI.Favorites.Requests.addFavoriteRequest): Promise<VRCAPI.Favorites.Models.Favorite> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.favorites.addFavorite,
            pathFormated: ApiPaths.favorites.addFavorite.path,
            body: {
                type,
                favoriteId,
                tags
            }
        };

        return await this.executeRequest<VRCAPI.Favorites.Models.Favorite>(paramRequest);
    }
    
    /**
     * Return information about a specific Favorite.
     */
    public async showFavorite({
        favoriteId
    }: VRCAPI.Favorites.Requests.favId): Promise<VRCAPI.Favorites.Models.Favorite> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.favorites.showFavorite,
            pathFormated: ApiPaths.favorites.showFavorite.path.replace('{favoriteId}', favoriteId),
        };

        return await this.executeRequest<VRCAPI.Favorites.Models.Favorite>(paramRequest);
    }
    
    /**
     * Remove a favorite from your favorites list.
     */
    public async removeFavorite({
        favoriteId
    }: VRCAPI.Favorites.Requests.favId): Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.favorites.removeFavorite,
            pathFormated: ApiPaths.favorites.removeFavorite.path.replace('{favoriteId}', favoriteId),
        };

        return await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);
    }
    
    /**
     * Return a list of favorite groups owned by a user. Returns the same information as `getFavoriteGroups`.
     */
    public async listFavoriteGroups({
        ownerId,
        n,
        offset
    }: VRCAPI.Favorites.Requests.listFavoriteGroupsRequest): Promise<VRCAPI.Favorites.Models.FavoriteGroup[]> {

        const parameters: URLSearchParams = new URLSearchParams();

        if (n) {
            if (n > 100 || n < 1) throw new Error('Quantity must be between 1 and 100!');
            parameters.append('n', n.toString());
        }

        if (offset) {
            if (offset < 0) throw new Error('Offset must be greater than 0!');
            parameters.append('offset', offset.toString());
        }

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.favorites.listFavoriteGroups,
            pathFormated: ApiPaths.favorites.listFavoriteGroups.path.replace('{ownerId}', ownerId),
            queryOptions: parameters,
        };

        return await this.executeRequest<VRCAPI.Favorites.Models.FavoriteGroup[]>(paramRequest);
    }
    
    /**
     * Fetch information about a specific favorite group.
     */
    public async showFavoriteGroup({
        favoriteGroupType,
        favoriteGroupName,
        userId
    }: VRCAPI.Favorites.Requests.favoriteGroupRequest): Promise<VRCAPI.Favorites.Models.FavoriteGroup> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.favorites.showFavoriteGroup,
            pathFormated: ApiPaths.favorites.showFavoriteGroup.path.replace('{favoriteGroupType}', favoriteGroupType).replace('{favoriteGroupName}', favoriteGroupName).replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Favorites.Models.FavoriteGroup>(paramRequest);
    }
    
    /**
     * Update information about a specific favorite group.
     */
    public async updateFavoriteGroup({
        favoriteGroupType,
        favoriteGroupName,
        userId,
        displayName,
        visibility,
        tags
    }: VRCAPI.Favorites.Requests.updateFavoriteGroupRequest): Promise<VRCAPI.Favorites.Models.FavoriteGroup> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.favorites.updateFavoriteGroup,
            pathFormated: ApiPaths.favorites.updateFavoriteGroup.path.replace('{favoriteGroupType}', favoriteGroupType).replace('{favoriteGroupName}', favoriteGroupName).replace('{userId}', userId),
            body: {
                displayName,
                visibility,
                tags
            }
        };

        return await this.executeRequest<VRCAPI.Favorites.Models.FavoriteGroup>(paramRequest);
    }
    
    /**
     * Clear ALL contents of a specific favorite group.
     */
    public async clearFavoriteGroup({
        favoriteGroupType,
        favoriteGroupName,
        userId
    }: VRCAPI.Favorites.Requests.clearFavoriteGroupRequest): Promise<VRCAPI.Generics.RequestSuccess> {

        const paramRequest: VRCAPI.Generics.executeRequestType = {
            currentRequest: ApiPaths.favorites.clearFavoriteGroup,
            pathFormated: ApiPaths.favorites.clearFavoriteGroup.path.replace('{favoriteGroupType}', favoriteGroupType).replace('{favoriteGroupName}', favoriteGroupName).replace('{userId}', userId),
        };

        return await this.executeRequest<VRCAPI.Generics.RequestSuccess>(paramRequest);
    }
}