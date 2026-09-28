interface InitialViewUsingSearchQuery {
  searchQuery: string;
}

interface InitialViewUsingFolderPath {
  folderPath: string;
}

interface InitialViewUsingFileId {
  fileId: string;
}

interface InitialViewUsingCollection {
  collection: {
    id?: string;
  };
}

interface InitialViewUsingFileType {
  fileType: FileTypeValue;
}
export type InitialView = InitialViewUsingSearchQuery | InitialViewUsingFolderPath | InitialViewUsingFileId | InitialViewUsingCollection | InitialViewUsingFileType;

export interface ToolbarOptions {
  showCloseButton?: boolean;
  showInsertButton?: boolean;
  showAccountSwitcher?: boolean;
}

export interface MLSettings {
  initialView?: InitialView;
  multiple?: boolean;
  maxFiles?: number;
  toolbar?: ToolbarOptions;
  queryParams?: Record<string, string | number | boolean>;
  loginViaSSO?: boolean;
  widgetImagekitId?: string;
}

export interface MediaLibraryWidgetOptions {
  className?: string;
  container: string | HTMLElement;
  dimensions?: {
    height: string;
    width: string;
  };
  view?: 'modal' | 'inline';
  renderOpenButton?: boolean;
  mlSettings?: MLSettings;
}
export interface MediaLibraryWidgetOptionsExtended extends MediaLibraryWidgetOptions {
  containerDimensions?: {
    height: string;
    width: string;
  }
  style?: any;
}


export type MediaLibraryWidgetCallback = (payload: any) => void;


export enum InitialViewParameterEnum {
  SEARCH_QUERY = 'searchQuery',
  FOLDER_PATH = 'folderPath',
  FILE_ID = 'fileId',
  COLLECTION = 'collection',
  FILE_TYPE = 'fileType'
}

export enum FileTypeValue {
  IMAGE = 'images',
  VIDEO = 'videos',
  CSSJS = 'cssJs',
  OTHERS = 'others'
}