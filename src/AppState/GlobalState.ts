export class GlobalStateManager {
  private static instance: GlobalStateManager;

  private state: Record<string, any>;

  private constructor() {
      const storedData = localStorage.getItem('state');
        if (storedData) {
            this.state = JSON.parse(storedData)
        } else {
            this.state = {}
      }
  }

  public static getInstance(): GlobalStateManager {
    if (!GlobalStateManager.instance) {
      GlobalStateManager.instance = new GlobalStateManager();
    }
    return GlobalStateManager.instance;
  }

  public getState(key: string): any {
    return this.state[key];
  }

  public setState(key: string, value: any): void {
    this.state[key] = value;
  }

  public clearState(): void {
    this.state = {};
    localStorage.clear();
    }
  
    public storeData(): void{
      localStorage.setItem('state', JSON.stringify(this.state));
  };
}

const globalState = GlobalStateManager.getInstance();
export default globalState;
