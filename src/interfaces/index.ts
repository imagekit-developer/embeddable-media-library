export interface InitialView {
    searchQuery?: string;
    folderPath?: string;
    fileId?: string;
    collection?: {
        id?: string;
    };
    fileType?: FileTypeValue;
}

export interface MLSettings {
  initialView?: InitialView;
  multiple?: boolean;
  maxFiles?: number;
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
  IMAGE = 'image',
  VIDEO = 'video',
  CSSJS = 'cssJs',
  OTHERS = 'others'
}